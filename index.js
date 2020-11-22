#!/usr/bin/env node
const mdLinks = require('./mdLinks.js'); 
const chalk = require("chalk");
const log = console.log;
const fetch = require('node-fetch');
const marked = require('marked');
const fs = require('fs');
const path = require('path');
let pathC = process.argv[2];
pathC = path.normalize(path.resolve(pathC));

// Función que muestra archivos que se encuentran dentro del directorio.

const readDir = (__dirname => {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, subdirs) => {
      if (err) {
        reject(console.log(err, "El directorio esta vacío"))
      }
      resolve(subdirs);

      subdirs.forEach(file => {
        if (path.extname(file) === ".md") {
          console.log("Archivos Markdown: ", file)
          readFiles()
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log("Este no es un archivo Markdown, ingresa un archivo con extensión .md");
            })

        }
      })

    })
  })
});


// Función que lee archivos con extensión ".md"

const readFiles = (pathFile) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(gettingLinks(data, pathFile))
    })
  })
}


// Función principal que confirma existencia de ruta y directorio

const validatePathAndDirectory = (route) => {

  if (fs.existsSync(route)) {
    try {
      const dir = fs.lstatSync(route).isDirectory()
      fs.lstatSync(route).isDirectory()
      if (dir) {
        readDir(route)
          .then(res => {
            console.log("Archivos en directorio: ", res);
          })
          .catch(err => {
          })
      }
      else {
        readFiles(route)
          .then(res => {
            //console.log(res);
          })
          .catch(err => {
          })
      }
    } catch (e) {
      if (e.code == 'ENOENT') {
      } else {
      }
    }
  } else {
    console.log("Ingresa una ruta válida")
  }
}

validatePathAndDirectory(pathC)


// Función que extrae links, texto y rutas de archivos con extensión "md"

const gettingLinks = (textFile, file) => {

  let arrayLinks = [];

  const renderer = new marked.Renderer();

  renderer.link = (href, title, text) => {

    if (!href.startsWith('#')) {
      arrayLinks.push({ href, text: text.slice(0, 50), file });  
    }
  }
  marked(textFile, { renderer });

 mdLinks(arrayLinks)
}


// Función que valida los links extraidos y retorna el status en numero y texto 

const validateLinksAll = (validateLinks, stats) => {
  const linksValidateWithFetch = validateLinks.map((element) => {
    return fetch(element.href)
      .then((res) => {
        return {
          href: res.url,
          text: element.text,
          file: element.file,
          status: res.status,
          statusText: res.statusText,
        }

      });

  });

 
  Promise.all(linksValidateWithFetch)

    .then(resp => {
       if (stats === true) {
        statsLinks(validateLinks);
      } else {
      resp.forEach(element => {

       log(chalk.green(element.file) + " " + 
           chalk.cyan(element.href) + " " + 
           chalk.yellow(element.status) + " " + 
           chalk.magenta(element.statusText) + " " + 
           chalk.white(element.text));
      
      });
  
       }
      
    }); 
}

// Stats para los links, total y unique.

const statsLinks = (linksStats) => {

  let hrefNewArray = [];

  linksStats.forEach(link => {
    hrefNewArray.push(link.href);
   
  });
  let uniqueLinks = new Set(hrefNewArray);
  


 log(chalk.blue("STATS:") + '\n' + 
     chalk.magentaBright("TOTAL: " + hrefNewArray.length) + '\n' + 
     chalk.green("UNIQUE: " + uniqueLinks.size))

  }


// Enlaces rotos, muestra el total, unique y broken.

  const brokenLinksAll = (statsValidateLinks) => {

    let brokenLinks = [];
  
    statsValidateLinks.map(element => {
      brokenLinks.push(element.href);
  
    });
  
    let linksBrokenArray = new Set(brokenLinks.map(JSON.stringify));

    const arrayForBrokenLinks = Array.from(linksBrokenArray).map(JSON.parse);
  
   const filterBrokenLinks = arrayForBrokenLinks.filter(
     (element) => element.status >= 400)
  
    Promise.all(statsValidateLinks).then((resp) => {
  
      log(chalk.blue("STATS AND VALIDATE:") + '\n' + 
          chalk.magentaBright("TOTAL: " + brokenLinks.length) + '\n' + 
          chalk.green("UNIQUE: " + linksBrokenArray.size) + '\n' + 
          chalk.red("BROKEN: " + filterBrokenLinks.length))
    });
  }


  module.exports = {
    gettingLinks, 
    validateLinksAll, 
    brokenLinksAll, 
    statsLinks, 
  }
