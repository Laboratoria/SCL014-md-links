#!/usr/bin/env node
//muestra las opciones para el usuario
// const commander = require('commander');
// const program = new commander.Command();
// program.version('0.0.1');
//busca los archivos
const fs = require("fs");
const path = require("path");

const marked = require("marked");
//para hacer petición url
//const fetch = require("fetch");
//const fetchUrl = fetch.fetchUrl;
const fetch = require("node-fetch");

const fileHound = require("fileHound");
const chalk = require("chalk");

// let pathToFile = process.argv[2];
// console.log("PATH:", pathToFile);
let links = [];
//let linksFail = [];
//let linksOk = [];
let totalLinks = 0;
let uniqueLinks = 0;
//let brokenLinks = 0;
// let firstOption = process.argv[3];
// // console.log("FIRST OP:", firstOption);
// let secondOption = process.argv[4];
// // console.log("SECOND OP:", secondOption);



// let links = [];
// //options
// let options = {
//  validate: false,
//  stats: false,
  
//  };
//  if (
//     (firstOption === "--validate" && secondOption === "--stats") ||
//     (firstOption === "--v" && secondOption === "--s") ||
//     (firstOption === "--stats" && secondOption === "--validate") ||
//     (firstOption === "--s" && secondOption === "--v")
//   ) {
//     options.validate = true;
//     options.stats = true;
//   } else if (firstOption === "--validate" || firstOption === "--v") {
//     options.validate = true;
//     options.stats = false;
//   } else if (firstOption === "--stats" || firstOption === "--s") {
//     options.validate = false;
//     options.stats = true;
//   } else {
//     options.validate = false;
//     options.stats = false;
//   }
  
// if (
//   (firstOption === "--validate" && secondOption === "--stats") ||
//    (firstOption === "--v" && secondOption === "--s")
// // ) {
// //   options.validate = true;
//   options.stats = true;
//   // options.flagError = false;
// } else if (firstOption === "--validate" || firstOption === "--v") {
//   options.validate = true;
//   option.stats = false;
//   // options.flagError = false;
// } else if (firstOption === "--stats" || firstOption === "--s") {
//   options.validate = false;
//   options.stats = true;
//   // options.flagError = false;
// }
// else {
 //console.log("Opción no valida");
//   options.validate = false;
//   options.stats = false;
//   options.flagError = true;
// }

// const isFileOrDirectory = path => {
//     fs.lstat(path, (err, stats) => {
//       if (err) {
//         console.log("Encontramos un error: la ruta o archivo no es valido");
//       } else if (stats.isDirectory()) {
//         console.log("es directorio");
//          // return goDirectory(path);
//     } else {
//         console.log("es archivo");
//         return goMdFile(path);
//       }
//     });
//   };

//ruta absoluta para relativa
// pathToFile = path.resolve(pathToFile);
// console.log("PATH RESOLVE:", pathToFile);
// pathToFile = path.normalize(pathToFile);
// console.log("PATH NORMALIZE:", pathToFile);


//FUNCION MADRE CON LAS OPCIONES DE MDLINKS
const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
      if (options.validate === true && options.stats === true) {
        isFileOrDirectory(path).then(res => {
          statsValidateOption(res)
            .then(res => {
              resolve(res);
              console.log(chalk.bold.white("VALIDATE + STATS RESULT:" + "\n"));
            });
        });
      } else if (options.validate === false && options.stats === true) {
        isFileOrDirectory(path).then(res => {
          statsOption(res).then(res => {
            resolve(res);
            console.log(chalk.bold.white("STATS LINKS RESULT:" + "\n"));
            //console.log("STATS", res);
          });
        });
      } else if (options.validate === true && options.stats === false) {
        isFileOrDirectory(path).then(links => {
          validateOption(links).then(res => {
            resolve(res);
            console.log(chalk.bold.white("VALIDATE LINKS RESULT:" + "\n"));
            //console.log("VALIDATE:", res);
          });
        });
      } else if (options.validate === false && options.stats === false) {
        isFileOrDirectory(path)
          .then(res => {
            resolve(res);
            console.log(chalk.bold.white("LINKS SEARCH RESULT:" + "\n"));
            //console.log("SIN OPCION:", res);
          })
          .catch(err => {
            reject(err);
            console.log("Choose an option: No option | --validate or --v | --stats or --s  | --validate --stats or --v --s");
            //console.log("Elija una opción: Ninguna opcion | --validate o --v | --stats o --s  | --validate --stats o --v --s");
          });
 // } else {
   //     reject(
   //       err
   //     );
      }
    });
  };

const isFileOrDirectory = (path) => {
    return new Promise((resolve, reject) => {
        fs.lstat(path, (err, stats) => {
          if (err) {
            //reject(console.log("Encontramos un error: la ruta o archivo no es valido"));
            reject(
               // console.log(chalk.bgRed("Encontramos un error: la ruta o archivo no es valido. Sólo archivos con extensión .md"))
              err
               );
          } else if (stats.isDirectory()) {
            console.log(chalk.bold("It is a directory"));
            // return goDirectory(path);
            resolve(goDirectory(path));
          } else {
            resolve(goMdFile(path));
          }
        });
      })
    };
    
// const goDirectory = (path) => {
//   return new Promise((resolve, reject) => {
//     fileHound
//       .create()
//       .discard("node_modules") //saca la carpeta
//       .paths(path)
//       .ext("md")
//       .find((err, files) => {
//         if (files.length === 0) {
//           console.log(err);
//           reject("Lamentablemente no hay archivo .md en este directorio");
//         }
//       })
//       .then(files => {
//         resolve(files);
//       });
//   });
// };
// Imprime en terminal los archivos que concuerden con la extención del formato markdown ".md".
const goDirectory = (path) => {
    return new Promise((resolve, reject) => {
      fileHound.create()
        .discard("node_modules")
        .paths(path)
        .ext(".md")
        .find()
        .then(res => (res.forEach(file => {
          if (file.length != 0) {
            console.log("We have found .md files at: " + file);
            resolve(readMdFile(file));
          }
        })))
        .catch(err => {
          reject(new Error("Path it is not valid"));
        })
    })
  };
//FUNCION PARA BUSCAR LOS ARCHIVOS .MD
const goMdFile = file => {
    let extFile = path.extname(file);
    if (extFile === ".md") {
      //console.log("es un archivo .md");
      return readMdFile(file);
    } else {
    //   console.log(
    //     "El archivo ingresado no es extensión .md, intente otro archivo o directorio"
    //   );
    console.log(chalk.bgRed("This is not an .md extention file, try another file or directory" + "\n"));
    }
  };

// new Promise((resolve, reject) => {
//   if (options[0] === undefined && options[1] === undefined) {
//     isFileOrDirectory(pathToFile)
//       .then(links => {
//         resolve(links);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   }
// });
// const readMdFile = file => {
//     fs.readFile(file, "utf-8", (err, data) => {
//        // let links = [];
//       if (err) {
//         console.log(err);
//      // }  else if (links.length === 0) {
//       //  console.log("Oh! No hay links en este archivo");
//       } else {
      
//         const renderer = new marked.Renderer();
//         renderer.link = function (href, title, text) {
//           links.push({
//             href: href,
//             file: file,
//             text: text
//           });
//         };
//         marked(data, { renderer: renderer });
       
//         if (links.length === 0) {
//             console.log("Oh! No hay links en este archivo, intente otro");
//           } else {
//             // console.log("links del archivo:", links.length);
//             validateOption(links);
//             statsOption(links);
//             // console.log("recebe:", links);
//             return links;
//           }
//       }
//     });
//   };
//función para leer los archivos .md y verificar si hay links
const readMdFile = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const renderer = new marked.Renderer();
            renderer.link = function (href, title, text) {
              links.push({
                href: href,
                file: file,
                text: text
              });
            };
            marked(data, {
              renderer: renderer
            });
             if (links.length === 0) {
                console.log(chalk.bold.red("We haven´t found any links at: ") + chalk.red.underline(file));
            } else {
            //   // console.log("links del archivo:", links.length);
            // validateOption(links);
            // statsOption(links);
            //   // console.log("recebe:", links);
            // }
            resolve(links);
          }}
        });
    })
  };

  //Estadisticas de TOTAL y UNIQUES
const statsOption = links => {
    return new Promise((resolve, reject) => {
      let allLinks = links.map(link => link.href);
      totalLinks += allLinks.length;
      uniqueLinks += [...new Set(allLinks)].length;
      let statsResult = {
        total: totalLinks,
        unique: uniqueLinks
      };
      resolve(statsResult);
    });
  };

  //Validar los links con sus status
const validateOption = links => {
    //console.log("LINKS:", links);
    return new Promise((resolve, reject) => {
      let statusLinks = links.map(link => {
        // links.map(link => {
        return fetch(link.href).then(res => {
          if (res.status > 299) {
            link.status = res.status;
            link.response = "FAIL";
          } else {
            link.status = res.status;
            link.response = "O.K.";
            //console.log("LINK OK:", linksValidate);
          }
        });
      });
      Promise.all(statusLinks).then(res => {
        resolve(links);
        //console.log("VALIDATE:", links);
      });
    });
  };

  const statsValidateOption = (links) => {
    return new Promise((resolve, reject) => {
      validateOption(links).then(link => {
        let allLinks = link.map(link => link.href);
        let statusLinks = links.map(link => link.response);
        let totalLinks = statusLinks.length;
        //console.log("totalLinks:", totalLinks);
        let uniqueLinks = [...new Set(allLinks)].length;
        //console.log("uniqueLinks:", uniqueLinks);
        // let linksOk = statusLinks.toString().match(/OK/g);
        // console.log("linksOk", linksOk);
        let linksOk = (statusLinks.toString().match(/O.K./g)).length;
        let brokenLinks = (statusLinks.toString().match(/FAIL/g)).length;
        //console.log("linksBroken:", brokenLinks);
        let statsResult = {
          Total: totalLinks,
          Unique: uniqueLinks,
          Broken: brokenLinks
        };
        resolve(statsResult);
        //console.log("STATS RESULT:", statsResult);
      }).catch(err => {
        reject(err)
      })
    })
  }
  
  
  
 //exporta función madre mdLinks para index.js
module.exports = mdLinks;
//   const validateOption = (links) => {
//     // console.log("LINKS:", links);
//     links.forEach(link => {
//      // console.log("LINKS:", link.href);
//       fetchUrl(link.href, function (error, meta, body) {
//         if (meta.status > 299) {
//          // console.log("URL:", meta.finalUrl);
//           //console.log("STATUS: FAIL", meta.status);
//           linksFail.push({
//             url: meta.finalUrl,
//             status: meta.status
//           })
//           console.log("linksFail:", linksFail);
//           return linksFail;
//         // console.log("URL:", meta.finalUrl);
//         // console.log("STATUS: FAIL", meta.status);
//         } else {
//           //console.log("URL:", meta.finalUrl);
//          // console.log("STATUS: OK", meta.status);
//          linksOk.push({
//             url: meta.finalUrl,
//             status: meta.status
//           })
//           // console.log("URL:", meta.finalUrl);
//           // console.log("STATUS: OK", meta.status);
//           console.log("linksOK:", linksOk);
//           return linksOk;
//         }
//       })
//     })
//   };
//función para validar el status de cada link del archivo
// const validateOption = (links) => {
//      //console.log("LINKS:", links);
//   linksValidate = [];
//   return Promise.all(links.map(link => {
//     return new Promise((resolve, reject) => {

//       // links.map(link => {
//       fetch(link.href).then(res => {
//         if (res.status > 299) {
//           link.status = res.status;
//           link.response = "FAIL";
//           resolve(link);
//           linksValidate.push(link);
//         }
//         //else {
//         //     link.status = res.status;
//         //     link.response = res.statusText;
//         //     resolve(link);
//         //     console.log("LINK OK:", link);
//         //   }
//         // })
//         // .catch(err => {
//         //   link.status = null;
//         //   link.response = "FAIL";
//         //   resolve(link);
//         //   console.log("ERR:", link);
//         // });
//         //console.log("LINK FAIL llalalla:", myLinks);
//         resolve(linksValidate);
//       })
//     });
//   }));
// };



// //   const statsOption = (links) => {
// //     let allLinks = links.map(link => link.href);
// //     let broken = [];
// //     //console.log("ALL LINKS:", allLinks);
// //     totalLinks += allLinks.length;
// //     //console.log("TOTAL LINKS:", totalLinks);
// //     uniqueLinks += [...new Set(allLinks)].length;
// //     //console.log("UNIQUE LINKS:", uniqueLinks);
// //     links.forEach(link => {
// //       //console.log("LINKS:", link.href);
// //       fetchUrl(link.href, function (error, meta, body) {
// //         if (meta.status > 299) {
// //           //console.log("404:", meta.finalUrl);
// //           // //   broken += [broken.push(meta.finalUrl)].length;
// //           console.log("STATUS:", meta.status);
// //         }
// //       })
// //     });
// //     console.log("BROKEN LINKS:", broken);
// //     let statsResult = {
// //       total: totalLinks,
// //       unique: uniqueLinks,
// //       broken: brokenLinks
// //     }
// //     console.log(statsResult);
// //   };
// const statsOption = (links) => {
//     console.log("aaaaaaaaaaaaaaaaaaa", links)
//     return new Promise((resolve, reject) => {
//       let allLinks = links.map(link => link.href);
//       let broken = [];
//       let brokenLinks = 0;
//       totalLinks += allLinks.length;
//       uniqueLinks += [...new Set(allLinks)].length;
//       console.log("UNIQUE LINKS:", uniqueLinks);
//       links.filter(link => {
//         console.log("LINK::", link);
//         if (link.status > 299) {
//           broken.push(link.status);
//           console.log("BROKEN:", broken.length);
//           brokenLinks += broken.length;
//           console.log("BROKEN LINKS:", brokenLinks);
//         };
//       });
//       let statsResult = {
//         Total: totalLinks,
//         Unique: uniqueLinks,
//         Broken: broken.length
//       };
//       resolve(statsResult);
//       console.log("STATS RESULT:", statsResult);
//     })
//   };
 
// //   const mdlinks = path => {
// //     isFileOrDirectory(path);
// //   };
// //   mdlinks(pathToFile);
// const mdlinks = (path) => {
//     let links;
//     return new Promise((resolve, reject) => {
//       isFileOrDirectory(path)
//         .then(res => {
//           validateOption(res)
//             .then(res => {
//               resolve(res)
//               console.log("ccccccccccccccccccc", res)
//             })
  
//         })
//       // validateOption(links)
//       // .then(res => {
//       //   statsOption(res)
//       //     .then(res => {
//       //       resolve(res);
//       //     });
//       // });
//     });
//   };
  
//   mdLinks(pathToFile);