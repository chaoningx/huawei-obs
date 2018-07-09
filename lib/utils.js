const url = require('url');
const crypto = require('crypto');
const moment = require('moment');
const parseString = require('xml2js').parseString;
const config = require('./config');
const errorCode = require('./code').errorCode;

moment.locale('en');

function _createSignature(secret, args) {
  return crypto.createHmac('sha1', secret).update(args).digest().toString('base64');
};

/**
 * 构建CanonicalizedHeaders
 * OBS自定义的字段，以“x-obs-”作为前辍的消息头，如“x-obs-date，x-obs-acl”。
 * 1.自定义字段中的所有字符要转为小写，需要添加多个字段时，要将所有字段按照字典序进行排序。
 * 2.在添加自定义字段时，如果有重名的字段，则需要进行合并。如：x-obs-meta-name:name1和x-obs-meta-name:name2，则需要合并成x-obse-meta-name:name1,name2。
 * 3.当自定义字段中，含有非ASCII码或不可识别字符时，需进行Base64编码
 * 4.当自定义字段中含有无意义空格或table键时，需要摒弃。例如：x-obs-meta-name: name（name前带有一个无意义空格），需要转换为：x-obs-meta-name:name
 * 5.每一个自定义字段最后都需要另起新行
 * 详细文档：https://support.huaweicloud.com/api-obs/zh-cn_topic_0100846723.html#ZH-CN_TOPIC_0100846723__table46456687212511
 * @param {Object} headers 消息头
 * @returns {string}
 */
function _getCanonicalizedHeaders(headers) {
  const pre = 'x-obs-';
  const temp = {};
  const obsHeader = [];

  Object.keys(headers).forEach((key) => {
    const k = key.toLowerCase();
    if(k.indexOf(pre) === 0) {
      if(typeof temp[k] === 'undefined') {
        temp[k] = headers[key];
      }else {
        temp[k] = [temp[k], headers[key]].join(',')
      }
    }
  });

  Object.keys(temp).sort().forEach((key) => {
    obsHeader.push(`${key}:${temp[key]}`)
  });

  return obsHeader.join('\n');
};

/**
 * 构建CanonicalizedResource
 * 表示HTTP请求所指定的OBS资源，构造方式如下：
 * <桶名+对象名>+[子资源]+[查询字符串]
 * 1.桶名和对象名，例如：/bucket/object. 如果没有对象名，如列举桶。则为"/bucket/",如桶名也没有，则为“/”
 * 2.如果有子资源，则将子资源添加进来，例如?acl，?logging。
 *   子资源包括acl, lifecycle, location, logging, notification, partNumber, policy, uploadId,
 *   uploads, versionId, versioning, versions, website, quota, storageClass, storageinfo, delete, restore,
 *   tagging, cors, replication。
 * 3.如有查询字符串那么将这些查询字符串及其请求值按照字典序从小到大排列。
 * 详细文档：https://support.huaweicloud.com/api-obs/zh-cn_topic_0100846723.html#ZH-CN_TOPIC_0100846723__table46456687212511
 * @param {String} path 桶名+对象名
 * @param {String} childResource 子资源
 * @param {Object} query 查询字符串
 * @returns {string}
 */
function _getCanonicalizedResource(path, childResource, query) {
  const params = [];

  if(childResource) {
    params.push(childResource);
  }

  if(query) {
    if(typeof query === 'string') {
      params.push(query);
    }else if(query) {
      Object.keys(query).sort().forEach((key) => {
        params.push(`${key}=${query[key]}`);
      });
    }
  }

  const flag = params.length > 0 ? '?' : '';

  return `${path || '/'}${flag}${params.join('&')}`;
};

/**
 * 适用于xml2js将xml转为JSON后的值
 * @param obj
 * @param key
 * @returns {string}
 */
function getValueFromBodyJSON(obj, key) {
  const val = obj[key];

  if(val && val.constructor === Array) {
    return val.join('');
  }

  return val;
};

function composeErrorMessage(message='unknown error', code='Unknown', detail={}) {
  return {
    code: code || 'Unknown',
    message: message || 'unknown error',
    detail: detail || {}
  };
};

function getValueFromHeaders(headers, k, defaultValue) {
  return headers[k] || headers[k.toLowerCase()] || defaultValue;
};

/**
 * 生成请求的时间，该时间格式遵循RFC 1123；
 * @returns {string}
 */
function getDateString() {
  return moment().utc().format('ddd, D MMM YYYY HH:mm:ss') + ' GMT';
};

/**
 * 生成签名
 * @param {String} secret 密钥
 * @param {String} method HTTP方法，GET, PUT, ...
 * @param {Object} headers HTTP头部信息
 * @param {String} path 桶名+对象名
 * @param {String} childResource 子资源
 * @param {Object} query 查询字符串
 * @returns {string}
 */
exports.getSignature = function getSignature(secret, method, headers, path, childResource, query) {
  const signContent = [
    method.toUpperCase()
  ];

  const md5 = getValueFromHeaders(headers, 'Content-MD5', '');
  const date = headers[config.OBS_DATE_KEY] || getValueFromHeaders(headers, 'Date', getDateString());

  // if(md5) {
    signContent.push(md5);
  // }

  signContent.push(getValueFromHeaders(headers, 'Content-Type', ''));
  signContent.push(date);

  const resource = _getCanonicalizedResource(path, childResource, query);
  signContent.push(_getCanonicalizedHeaders(headers) + resource);

  return {
    resource,
    content: _createSignature(secret, signContent.join('\n'))
  }
};

exports.parsePath = function parsePath(p) {
  if(!p) {
    return {};
  }

  const result = {
    resourcePath: '',
    childResource: '',
    query: null
  };
  const urlParse = url.parse(p);
  const params = urlParse.search ? urlParse.search.split('&') : [];

  result.resourcePath = encodeURIComponent(urlParse.pathname).replace(/%2F/g, '/');

  if(params.length > 0 && params[0].indexOf('?') === 0) {
    result.childResource = params.shift().replace('?', '');
  }

  const len = params.length;

  if(len > 0) {
    let temp = '';

    result.query = {};

    for(let i = 0; i < len; i++) {
      temp = params[i].split('=');
      result.query[temp[0]] = temp[1];
    }
  }

  return result;
};

exports.getURLWithoutBucketName = function getURLWithoutBucketName(url, bucketName) {
  const arr = url.slice(1).split('/');
  let rs = url;

  if(arr[0] === bucketName) {
    arr.shift();
    rs = '/' + arr.join('/');
  }

  return rs;
};

exports.formatResponseBodyFromXMLToJSON = function formatResponseBody(body, callback) {
  if(!body) {
    return callback && callback();
  }

  parseString(body, (err, result) => {
    if(err) {
      return callback && callback(composeErrorMessage(err.message));
    }

    if(result.hasOwnProperty('Error')) {
      const info = result['Error'];

      if(!info) {
        return callback && callback(composeErrorMessage());
      }

      const detail = {
        code: getValueFromBodyJSON(info, 'Code'),
        message: getValueFromBodyJSON(info, 'Message'),
        requestId: getValueFromBodyJSON(info, 'RequestId')
      };

      const errorCodeMessage = errorCode[detail.code];

      if(!errorCodeMessage) {
        return callback && callback(composeErrorMessage('errorCode表中没有相关信息，请联系管理员更新OBS错误码列表', '-1', detail));
      }

      return callback && callback(composeErrorMessage(`${errorCodeMessage.cn} ${errorCodeMessage.httpMessage}`, detail.code, detail));
    }

    callback && callback(null, result);
  });
};

exports.escape = function escape(str) {
  return encodeURIComponent(str).replace(/%2F/g, '/').replace(/%2F/g, '/')
};

exports.merge = function merge(source, target) {
  const t = {};
  for(let k in source) {
    t[k] = typeof target[k] !== 'undefined' ? target[k] : source[k];
  }

  return t;
};

exports.getValueFromHeaders = getValueFromHeaders;
exports.composeErrorMessage = composeErrorMessage;
exports.getValueFromBodyJSON = getValueFromBodyJSON;
exports.getDateString = getDateString;
