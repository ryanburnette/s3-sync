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

s3sync({
  source: path.resolve(__dirname,'assets'),
  destination: `${process.env.VERSION}`,
  bucket: 'mybucket'
});
```

[1]: https://code.ryanburnette.com/ryanburnette/s3-sync.js
