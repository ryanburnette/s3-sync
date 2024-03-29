'use strict';

var path = require('path');
var walk = require('walk').walk;
var upload = require('@ryanburnette/s3-upload-file');

function sync(opts) {
  if (!opts) {
    opts = {};
  }
  if (!opts.path) {
    throw new Error('opts.path must be set');
  }
  if (!opts.uploadOpts) {
    opts.uploadOpts = {};
  }
  if (!Object.keys(opts).includes('ignoreDotFiles')) {
    opts.ignoreDotFiles = true;
  }

  return new Promise(function(resolve, reject) {
    var walker = walk(path.join(opts.cwd || '', opts.path));
    var results = [];

    walker.on('file', function(root, fileStats, next) {
      if (opts.ignoreDotFiles && fileStats.name.startsWith('.')) {
        return next();
      }
      var filePath = path.join(root, fileStats.name);
      if (opts.cwd) {
        filePath = path.normalize(filePath.replace(opts.cwd, ''));
      }
      Promise.resolve()
        .then(function() {
          if (opts.preUpload) {
            return opts.preUpload(filePath);
          }
        })
        .then(function() {
          return upload({
            s3: opts.s3,
            filePath,
            cwd: opts.cwd,
            remotePathPrefix: opts.remotePathPrefix,
            uploadOpts: JSON.parse(JSON.stringify(opts.uploadOpts))
          });
        })
        .then(function(result) {
          if (opts.postUpload) {
            return opts.postUpload({ filePath, result });
          }
          return result;
        })
        .then(function(result) {
          results.push(result);
          next();
        });
    });

    walker.on('end', function() {
      resolve(results);
    });
  });
}

module.exports = sync;
