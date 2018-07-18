# huawei-obs

huawei OBS(Object Storage Service) client for nodeJS

## Installation

```bash
$ npm install huawei-obs --save
```

Node.js >= 8.0.0 required.

## Features

- ✔︎ put object from local to huawei obs online
- ✔︎ download object from huawei obs online.

## Doc

### putObject(name, filePath, [callback], [processCallback])

upload object

more detail：https://support.huaweicloud.com/api-obs/zh-cn_topic_0100846775.html
```text
@param {String} name - the name display in obs 
@param {String} filePath - upload file path
@param {Function} callback - callback when file uploaded 
@param {Function} processCallback - upload process callback, include processCallback(chunk, hasUploadPercent)
@param {String} bucketName - bucket name
```
 
### getObject(name, storagePath, [callback], [processCallback], [isOverwrite=false], [range])

download object

more detail：https://support.huaweicloud.com/api-obs/zh-cn_topic_0100846779.html
```text
@param {String} name - the name in obs
@param {String} storagePath - download file path
@param {Function} callback - callback when file has been download
@param {Function} processCallback - upload process callback, include processCallback(chunk, hasUploadPercent)
@param {Boolean} isOverwrite - if local file exist , is overwrite ? default: false
@param {String} bucketName - bucket name
```

### headObject(name, [callback], [bucketName])

get object information.

more detail：https://support.huaweicloud.com/api-obs/zh-cn_topic_0100846780.html
```text
@param {String} name - the name in obs
@param {Function} callback - callback
@param {String} bucketName - bucket name
```

### deleteObject(name, [callback], [bucketName])

delete object information.

more detail：https://support.huaweicloud.com/api-obs/zh-cn_topic_0100846782.html
```text
@param {String} name - the name in obs
@param {Function} callback - callback when file deleted
@param {String} bucketName - bucket name
```
## Example

```bash
const OBS = require('huawei-obs');

const client = new OBS({
  accessKey: 'access key',
  secretAccessKey: 'secret access key',
  endpoint: 'end point',
  bucketName: 'bucket name'
});

client.putObject(name, filePath, (err, info) => {
    .....
});

client.getObject(name, localPath, (err, info) => {
    .....
});

```

## License

[MIT](LICENSE)

