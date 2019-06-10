# @ryanburnette/[s3-sync.js][1]

Recursively sync a directory with S3.

I use this to sync my compiled assets with S3 during Heroku deployments.

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

### Release Directory

Set `options.releaseDir` to prefix the remote directory. Great for adding a
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

[1]: https://code.ryanburnette.com/ryanburnette/s3-sync.js
