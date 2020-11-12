const fs = require('fs');
const path = require('path');
const verifyRoute = require('./verifyRoute');
const verifyDir = require('./verifyDir');
const readDir = require('./readDir');
const readFile = require('./readFile');
const validate = require('./validate');

module.exports = (pathname, callback) => {

  verifyRoute(pathname, callback)
    .then(route => {
      verifyDir(route)
        .then(isDirectory => {
          if (isDirectory) {
            console.log('es un directorio, abrelo');
            readDir(route)
              .then(data => {
                data.forEach((file) => {
                  let extFile = path.extname(file);
                  if (extFile === '.md') {
                    console.log(file);
                    readFile(file, route)
                      .then(data => {
                        console.log(process.argv[3])
                        if (process.argv[3] === '--validate') {
                          validate(data)
                            .then(validatedData => {
                              console.log(validatedData);
                            })
                            .catch(error => console.log(error))
                        } if (process.argv[3] === undefined) {
                          console.log(data);
                        }
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
              readFile(route, route)
                .then(data => {
                  console.log(process.argv[3])
                  if (process.argv[3] === undefined) {
                    console.log(data);
                  }
                  if (process.argv[3] === '--validate') {
                    validate(data)
                      .then(validatedData => {
                        console.log(validatedData);
                      })
                      .catch(error => console.log(error))
                  }
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


