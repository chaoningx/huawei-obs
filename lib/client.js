const http = require('http');
const utils = require('./utils');

function getRequestOption(params) {
  const settings = utils.merge({
    method: 'GET',
    path: '/',
    headers: {},
    secretAccessKey: '',
    accessKey: '',
    bucketName: '',
    endpoint: '',
    protocol: 'http',
  }, params);

  for (let k in settings) {
    if(!settings[k]) {
      throw new Error(`request params ${k} is null.`);
    }
  }

  const parsePath = utils.parsePath(settings.path);
  const options = {
    method: settings.method
  };

  const host = `${settings.bucketName}.${settings.endpoint}`;

  options.headers = Object.assign({
    'Host': host,
    'Date': utils.getDateString(),
    'Content-Type': utils.getValueFromHeaders(settings.headers, 'Content-Type', ''),
  }, settings.headers || {});

  if (settings.method === 'PUT' && typeof options.headers['Content-Length'] === 'undefined') {
    throw new Error('PUT request header Content-type can not be undefined');
  }

  options.host = options.headers.Host;
  options.path = parsePath.resourcePath;

  const sign = utils.getSignature(settings.secretAccessKey, settings.method, options.headers, `/${settings.bucketName}${parsePath.resourcePath}`, parsePath.childResource, parsePath.query);
  const baseURL = `${settings.protocol || 'http'}://${host}`;

  options.headers['Authorization'] = `OBS ${settings.accessKey}:${sign.content}`;
  options.url = `${baseURL}${utils.getURLWithoutBucketName(sign.resource, settings.bucketName)}`;

  return options;
}

exports.request = function(params) {
  const settings = utils.merge({
    method: 'GET',
    path: '/',
    headers: {},
    callback: null,
    data: null,
    readStream: null,
    writeStream: null,
    processCallback: null,
    secretAccessKey: '',
    accessKey: '',
    bucketName: '',
    endpoint: '',
    protocol: 'http',
  }, params);

  const options = getRequestOption(settings);

  let stream = settings.readStream || settings.writeStream;
  let isHttpError = false;
  let isCallbackEmit = false;
  let contentLength = utils.getValueFromHeaders(settings.headers, 'Content-Length', 0);
  let responseHeaders = null;

  const cb = function(err, rs, index) {
    if(isCallbackEmit) { return false; }
    settings.callback && settings.callback(err, rs);
  };

  const req = http.request(options, (res) => {
    const httpCode = res.statusCode;
    responseHeaders = res.headers;

    if(httpCode === 200 && settings.readStream) {
      res.on('data', () => {});
      res.on('end', () => {
        cb(null, responseHeaders, 5);
      });
      return false;
    }

    const responseContentLength = utils.getValueFromHeaders(res.headers, 'Content-Length', 0);

    if(responseContentLength !== 0) {
      contentLength = responseContentLength;
    }

    const bufs= [];
    let bufLen = 0;

    res.on('error', (e) => {
      return cb(utils.composeErrorMessage(e.message));
    });

    res.on('data', (chunk) => {
      bufLen += chunk.length;
      bufs.push(chunk);

      if(settings.writeStream) {
        settings.processCallback && settings.processCallback(chunk, bufLen/contentLength);
      }
    });

    if(httpCode === 200 && settings.writeStream) {
      res.pipe(settings.writeStream);
      return false;
    }

    res.on('end', () => {
      const body = Buffer.concat(bufs, bufLen).toString('utf8');
      if(!body) {
        return cb(utils.composeErrorMessage('response body is empty', httpCode), null, 2)
      }
      utils.formatResponseBodyFromXMLToJSON(body, (err, rs) => {
        cb(err, rs);
      });
    });
  });

  req.on('error', () => {
    isHttpError = true;
    stream && stream.destroy(); // destroy方法会触发stream error事件
  });

  if(stream) {
    stream.on('error', (err) => {
      !isHttpError && cb(utils.composeErrorMessage(err.message), null);
    });

    if(settings.readStream) {
      let hasReadSize = 0;

      stream.on('data', (chunk) => {
        hasReadSize += chunk.length;
        settings.processCallback && settings.processCallback(chunk, hasReadSize/contentLength);
      });

      stream.on('end', () => {
        // cb(null, responseHeaders);
      });

      stream.pipe(req);
    }else {
      stream.on('pipe', () => {
        console.log('pipe ----> emit');
      });

      // 在有writeStream的情况下，只有stream写完时才触发回调
      stream.on('finish', () => {
        cb(null, responseHeaders);
      });
      req.end();
    }

    return false;
  }

  if(settings.data) {
    req.write(settings.data);
  }

  req.end();
};

exports.getRequestOption = getRequestOption;