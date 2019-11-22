'use strict';

require('dotenv').config({});
var AWS = require('aws-sdk');
var sync = require('../');

sync({
  // path: './assets.dist/',
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
  console.log(results);
});
