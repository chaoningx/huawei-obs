const fs = require('fs');
const mime = require('mime');
const request = require('./client').request;

class Index {
  constructor(settings) {
    this.settings = Object.assign({
      accessKey: '',
      secretAccessKey: '',
      bucketName: '',
      endpoint: '',
      protocol: 'http',
    }, settings);

    if (!this.settings.accessKey) {
      throw new Error('accessKey is null.');
    }

    if (!this.settings.secretAccessKey) {
      throw new Error('secretAccessKey is null.');
    }

    if (!this.settings.endpoint) {
      throw new Error('endpoint is null.');
    }
  }

  request(params) {
    request(Object.assign(this.settings, params));
  }

  /**
   * 获取对象权限
   * @param {String} objectName 对象名，存在OBS中的名字
   * @param {Function} callback 完成接口调用后的回调函数
   * @param {String} bucketName bucket名
   */
  getObjectACL(objectName, callback, bucketName) {
    const params = {
      method: 'GET',
      path: `/${objectName}?acl`,
      callback: (err, info) => {
        callback && callback(err, info);
      }
    };

    if(bucketName) {
      params.bucketName = bucketName;
    }

    this.request(params);
  }

  /**
   * 上传文件
   * 详细文档：https://support.huaweicloud.com/api-obs/zh-cn_topic_0100846775.html
   * @param {String} name 存储名，存到OBS后显示的名字
   * @param {String} filePath 上传的文件路径
   * @param {Function} callback 上传完成后的回调
   * @param {Function} processCallback 上传过程的进度，这里是指读文件的进度并不是发送到OBS后的进度，可以粗略看成是上传进度，如果一定要用的话
   * @param {String} bucketName bucket名
   */
  putObject(name, filePath, callback, processCallback, bucketName) {
    fs.stat(filePath, (err, st) => {
      const params = {
        method: 'PUT',
        path: `/${name}`,
        headers: {
          'Content-Length': st.size,
          'Content-Type': mime.getType(filePath),
          'User-Agent': 'curl/7.15.5'
        },
        callback: callback,
        readStream: fs.createReadStream(filePath),
        processCallback: processCallback
      };

      if(bucketName) {
        params.bucketName = bucketName;
      }

      this.request(params);
    });
  }

  /**
   * 下载文件
   * 详细文档：https://support.huaweicloud.com/api-obs/zh-cn_topic_0100846779.html
   * @param {String} name
   * @param {String} storagePath
   * @param {Function} callback
   * @param {Function} processCallback
   * @param {Boolean} isOverwrite 如果存在文件是不是覆盖
   * @param {String} range 单位：bytes，bytes=0-4或 bytes=512-1024，或者表示多个区间bytes=10-20,30-40
   * @param {String} bucketName bucket名
   */
  getObject(name, storagePath, callback, processCallback, isOverwrite=false, range, bucketName) {
    const headers = {};

    if(range) {
      headers['Range'] = range;
    }

    const params = {
      method: 'GET',
      path: `/${name}`,
      headers: headers,
      callback: callback,
      writeStream: fs.createWriteStream(storagePath, { flags: isOverwrite ? 'w' : 'wx' }),
      processCallback: processCallback
    };

    if(bucketName) {
      params.bucketName = bucketName;
    }

    this.request(params);
  }

  headObject(name, callback, bucketName) {
    const params = {
      method: 'HEAD',
      path: `/${name}`,
      headers: {},
      callback: callback,
    };

    if(bucketName) {
      params.bucketName = bucketName;
    }

    this.request(params);
  }
};

module.exports = Index;