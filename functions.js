const fs = require('fs');
const path = require('path');
const verifyRoute = require('./verifyRoute');
const verifyDir = require('./verifyDir');
const readDir = require('./readDir');
const readFile = require('./readFile');

/* let route = '';
const regEx = /\(https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*\)/gi;
const regExText = /\[(\w.*?)]\(h|\[(`\w.*?`)]\(h/gi;
const regExAll = /\[(\w.*?)]\(https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*\)|\[(`\w.*?`)]\(https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*\)/gi; */

/* const verifyRoute = ((pathname, callback) => new Promise((resolve) => {
  if (path.isAbsolute(pathname)) {
    route = pathname;
    resolve(route);
    return callback('la ruta ', pathname + ' es absoluta');
  } 
  route = path.resolve(pathname);
  resolve(route);
  return callback('la ruta ' + pathname + ' es relativa, la nueva ruta es', route);
}));
*/

/* const verifyDir = (route) => new Promise((resolve, reject) => {
  fs.stat(route, (error, stats) => {
    if (error && error.code === 'ENOENT') {
      reject(error);
      console.log('la ruta no existe')
    } else if (error) {
      reject(error);
    }
    if (!error && stats.isDirectory()) {
      return resolve(true);
    }
    return resolve(false);
  });
}) */

/* const readDir = (route) => new Promise((resolve, reject) => {
  fs.readdir(route, (error, data) => {
    if (error) {
      return reject(error);
    } else {
      return resolve(data);
    }
  })
}) */

/* const readFile = (file, route) => new Promise((resolve, reject) => {
  fs.readFile(file, "utf-8", (error, file) => {
    if (error) {
      reject(error);
    } else {
      let linksAndTexts = file.match(regExAll);
      //let links = file.match(regEx);
      //let text = file.match(regExText); 
      //let arrText = Array.from(text);

      if (linksAndTexts != null) {
        //console.log(linksAndTexts)
        let arrAll = Array.from(linksAndTexts);
        let arrLinks = [];
        arrAll.forEach(link => {
          let links = link.match(regEx).toString().replace(/\(|\)/gi, '');
          let text = link.match(regExText).toString().replace(/\[`|\`]\(h|\[|\]\(h/gi, '');
          let objectLinks = { 'href': links, 'text': text, 'file': route };
          arrLinks.push(objectLinks);
        })
        resolve(arrLinks)
      } else {
        console.log('No se encontraron links');
      }
    }
  })
}) */

module.exports = (pathname, callback) => {

  verifyRoute(pathname, callback)
    .then(route => {
      verifyDir(route).then(isDirectory => {
        if (isDirectory) {
          console.log('es un directorio, abrelo');
          readDir(route).then(data => {
            data.forEach((file) => {
              let extFile = path.extname(file);
              if (extFile === '.md') {
                console.log(file);
                readFile(file, route).then(data => {
                  console.log(data)
                })
                  .catch(error => console.log(error))
              } else {
                console.log('no hay archivos .md')
              }
            })
          })
            .catch(error => console.log(error));
        }
        else {
          console.log('es un archivo, leelo');
          let fileExt = path.extname(route);
          if (fileExt === '.md') {
            readFile(route, route).then(data => {
              console.log(data)
            })
              .catch(error => console.log(error))
          } else {
            console.log('no es un archivo .md')
          }
        }
      })
        .catch(error => console.log(error));
    });
}


