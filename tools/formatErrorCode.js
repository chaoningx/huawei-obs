'use strict';

/**
 * 在命令行中执行此脚本，根据error_code.txt文件生成error_code.js文件，error_code.js文件可以更友好的显示错误信息
 *
 * ```
 *  node formatErrorCode.js
 * ```
 * 详细的错误码链接：https://support.huaweicloud.com/api-obs/zh-cn_topic_0100846796.html
 * 如有更新，请选中表格中的数据，粘贴到error_code.txt文件中，覆盖原内容后执行此脚本
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'error_code.txt')
const targetPath = path.join(__dirname, 'error_code.js');

fs.readFile(filePath, (err, content) => {
  const temp = content.toString('utf8').split('\n\n');
  const newContent = [];

  for(let i = 0, len = temp.length; i < len; i=i+3) {
    newContent.push(`"${temp[i]}":{ cn: "${temp[i+1]}", httpMessage: "${temp[i+2]}" }`);
  }

  fs.writeFile(targetPath, `exports.errorCode = {\n  ${newContent.join(',\n  ')}\n};`, (err) => {
    console.log(err);
  });
});