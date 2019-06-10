'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var AWS = require('aws-sdk');
var walk = require('walk').walk;
var mime = require('mime-types');
var readFile = util.promisify(fs.readFile);

var s3 = new AWS.S3({ signatureVersion: 'v4' });

var required = ['source', 'bucket'];

module.exports = function(options) {
  required.forEach(function(k) {
    if (!Object.keys(options).includes(k)) {
      throw new Error(`options.${k} is required`);
    }
  });

  var source = options.source;
  var destination = options.destination || '';
  var Bucket = options.bucket;
  var ACL = options.acl || 'public-read';

  var walker = walk(path.resolve(source));
  var files = [];

  walker.on('file', function(root, fileStats, next) {
    var filename = fileStats.name;
    var fullpath = path.resolve(root, fileStats.name);
    if (options.ignoreDotfiles && filename.startsWith('.')) {
      return next();
    }
    if (options.ignore && options.ignore({ filename, fullpath })) {
      return next();
    }
    files.push(
      readFile(fullpath).then(function(buffer) {
        return {
          root,
          relDir: root.replace(source, ''),
          filename,
          fullpath,
          buffer
        };
      })
    );
    next();
  });

  walker.on('end', function() {
    Promise.all(files).then(function(results) {
      results.forEach(function(f) {
        var Key = path.join(destination, f.relDir, f.filename);
        var ContentType = mime.lookup(f.filename) || 'application/octet-stream';
        return s3
          .putObject({
            Bucket,
            Key,
            Body: f.buffer,
            ACL,
            ContentType
          })
          .promise()
          .then(function(result) {
            console.log(`PUT ${Key}`);
            return result;
          })
          .catch(function(err) {
            console.log(`ERR ${err.message} ${Key}`);
          });
      });
    });
  });
};
