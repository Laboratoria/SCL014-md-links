const path = require('path');
const verifyRoute = require('./verifyRoute');
const verifyDir = require('./verifyDir');
const readDir = require('./readDir');
const readFile = require('./readFile');
const verifyOptions = require('./verifyOptions');
const isMd = require('./isMd');
const findmd = require('./findmd');

module.exports = (pathname, callback) => {

  let route = path.resolve(pathname);


  verifyRoute(pathname, callback)
    .then(verifyDir)
    .then(isDirectory => {
      if (isDirectory) {
        readDir(route)
          .then(data => findmd(data, route))
          .then(par => readFile(par))
          .then(data => verifyOptions(data, pathname))
          .catch(error => console.log(error));
      } else {
        isMd(route)
          .then(par => readFile(par))
          .then(data => verifyOptions(data, pathname))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error));
}


