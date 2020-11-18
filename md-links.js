const path = require('path');
const verifyRoute = require('./verifyRoute');
const verifyDir = require('./verifyDir');
const readDir = require('./readDir');
const readFile = require('./readFile');
const verifyOptions = require('./verifyOptions');

module.exports = (pathname, callback) => {

  let route = path.resolve(pathname);
  let par; 

  verifyRoute(pathname, callback)
    .then(verifyDir)
    .then(isDirectory => {
      if (isDirectory) {
        readDir(route)
          .then((data) => {
            data.forEach((file) => {
              let extFile = path.extname(file);
              if (extFile === '.md') {
                par = {file, route};
              }
            })
            return readFile(par)
          })
          .then(data => {
            verifyOptions(data, pathname)
          })
          .catch(console.log('no hay archivos .md'))
      } else {
        let fileExt = path.extname(route);
        if (fileExt === '.md') {
          let file = route;
          par = {file, route};
          readFile(par)
            .then(data => {
              verifyOptions(data, pathname)
            })
            .catch(error => console.log(error))
        } else {
          console.log('no es un archivo .md')
        }
      }
    })
    .catch(error => console.log(error));
}


