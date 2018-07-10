const path = require('path');
const should = require('should');
const OBS = require('../lib/index');

const ORIGIN_FILE_PATH = '/Users/chaoningx/Desktop/test.flac';
const OBJECT_NAME = `中国/北方/北京_test_${new Date().getTime()}.jpg`;
const LOCAL_FILE_NAME = `北京_test_${new Date().getTime()}_download.jpg`;

const testDataPath = path.join(__dirname, 'data');

const client = new OBS({
  accessKey: '',
  secretAccessKey: '',
  endpoint: '',
  bucketName: '',
});

describe('Huawei OBS', () => {
  describe('#putObject()', () => {
    it('should not return err just info', (done) => {
      client.putObject(OBJECT_NAME, ORIGIN_FILE_PATH, (err, info) => {
        should.not.exist(err);
        should.exist(info);
        done();
      }, (chunk, processStatus) => {
        should.exist(chunk);
        should.exist(processStatus);
        console.log(processStatus);
      });
    });
  });

  describe('#getObject()', () => {
    it('should not return err just info', (done) => {
      client.getObject(OBJECT_NAME, path.join(testDataPath, LOCAL_FILE_NAME), (err, info) => {
        should.not.exist(err);
        should.exist(info);
        done();
      }, (chunk, processStatus) => {
        should.exist(chunk);
        should.exist(processStatus);
        console.log(processStatus);
      });
    });
  });
});
