# [s3-sync](https://github.com/ryanburnette/s3-sync)

[![repo](https://img.shields.io/badge/repository-Github-black.svg?style=flat-square)](https://github.com/ryanburnette/s3-sync) [![npm](https://img.shields.io/badge/package-NPM-green.svg?style=flat-square)](https://www.npmjs.com/package/@ryanburnette/s3-sync)

Sync a directory with AWS S3.

## Usage

It is expected that you configure using environment variables.
<https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EnvironmentCredentials.html>

```js
#!/usr/bin/env node

var path = require('path');
var s3sync = require('@ryanburnette/s3-sync');

var options = {
  source: path.resolve(__dirname, 'assets'),
  destination: `${process.env.VERSION}`,
  bucket: 'mybucket'
};

s3sync(options);
```

## Options

### Destination

Set `options.destination` to prefix the remote directory. Great for adding a
release value for cache busting.

### Ignore Dotfiles

Set `options.ignoreDotfiles = true` to ignore dotfiles.

### Ignore Function

Set `options.ignore` to a custom function to implement custom ignore logic. If
this function returns truthy, the current file will be ignored.

```javascript
options.ignore = function({ filepath, filename }) {
  if (filepath.startsWith('_')) {
    return true;
  }
  // whatever else
};
```
