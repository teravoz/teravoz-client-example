const request = require('request');
const fs = require('fs');

/**
  download(url)

  GETs `url` and streams response (file) to file system, naming file from url.
  For example:
  url: 'https://api.teravoz.com.br/recording/1463669263.30033.wav'
  file name: '1463669263.30033.wav'
  Will be recorded on `./recordings` path
*/
module.exports = function download(credentials, url, downloadCb) {
  const encodedCredentials = Buffer.from(credentials).toString('base64');
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  request
  .get({
    url: url,
    headers: {
      'Authorization': `Basic ${encodedCredentials}`
    }
  })
  .on('response', (response) => {
    console.log(`GET status code response is ${response.statusCode}`);
    if (response.statusCode !== 200) {
      downloadCb(new Error(`Got status code ${response.statusCode}. Could not download file.`));
    } else {
      downloadCb(null, fileName);
    }
  })
  .pipe(fs.createWriteStream(`./recordings/${fileName}`));
}