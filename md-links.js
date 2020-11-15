const fs = require('fs');
const path = require('path');
const { argv } = require('yargs')
const verifyRoute = require('./verifyRoute');
const verifyDir = require('./verifyDir');
const readDir = require('./readDir');
const readFile = require('./readFile');
const validate = require('./validate');
const stats = require('./stats');

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
                        if (argv.validate && argv.stats ===undefined|| argv.v && argv.s === undefined) {
                          validate(data)
                            .then(validatedData => {
                              validatedData.forEach(link => {
                                console.log(pathname, link.href, link.texto, link.status, link.statusText);
                              })
                            })
                            .catch(error => console.log(error))
                        }
                        if (argv.stats && argv.validate === undefined || argv.s && argv.v === undefined) {
                          stats(data)
                        }
                        if (argv.stats && argv.validate || argv.s && argv.v) {
                          validate(data);
                          stats(data)
                        }
                        if (process.argv[3] === undefined) {
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
                  if (argv.stats && argv.validate === undefined || argv.s && argv.v === undefined) {
                    stats(data)
                  }
                  if (argv.validate && argv.stats === undefined || argv.v && argv.s === undefined) {
                    validate(data)
                      .then(validatedData => {
                        validatedData.forEach(link => {
                          console.log(pathname, link.href, link.texto, link.status, link.statusText);
                        })
                      })
                      .catch(error => console.log(error))
                  }
                  if (argv.validate && argv.stats || argv.v && argv.s) {
                    stats(data);
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


