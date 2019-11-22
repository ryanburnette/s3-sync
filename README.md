# [s3-sync](https://github.com/ryanburnette/s3-sync)

[![repo](https://img.shields.io/badge/repository-Github-black.svg?style=flat-square)](https://github.com/ryanburnette/s3-sync)
[![npm](https://img.shields.io/badge/package-NPM-green.svg?style=flat-square)](https://www.npmjs.com/package/@ryanburnette/s3-sync)

Sync a directory with AWS S3.

## Usage

```js
require('dotenv').config({});
var AWS = require('aws-sdk');
var sync = require('@ryanburnette/s3-sync');

sync({
  cwd: 'assets.dist/',
  path: './',
  s3: new AWS.S3(),
  remotePathPrefix: '2.0.0',
  uploadOpts: {
    Bucket: process.env.BUCKET
  },
  uploadCb: function(filePath, result) {
    console.log('UPLOADED', filePath);
  }
}).then(function(results) {
  console.log('RESULTS', results);
});
```
