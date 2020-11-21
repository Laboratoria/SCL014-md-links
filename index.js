#!/usr/bin/env node
const mdLinksModule = require("./md-links"); 
const chalk = require("chalk");
const log = console.log;
const fetch = require('node-fetch');
const marked = require('marked');
const fs = require('fs');
const path = require('path');
let pathC = process.argv[2];
pathC = path.normalize(path.resolve(pathC));

//const validateLinks = require("./md-links");

// lee archivos en directorio, muestra array con archivos existentes dentro y los que tienen extension ".md"

const readDir = (__dirname => {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, subdirs) => {
      if (err) {
        reject(console.log(err, "El directorio esta vacio"))
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
              console.log("Este no es un archivo Markdown, ingresa un archivo con extension .md");
            })

        }
      })

    })
  })
});
//readDir(__dirname);


// Funcion que lee archivos de extension ".md"

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

// readFiles(path)

// Funcion principal que confirma existencia de ruta y directorio
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
            console.log(res);
          })
          .catch(err => {
          })
      }
    } catch (e) {
      if (e.code == 'ENOENT') {
      } else {
        //do something else
      }
    }
  } else {
    console.log("Ingresa una ruta valida")
  }
}

validatePathAndDirectory(pathC)

// Funcion que extrae links, texto y rutas de archivos con extension "md"

const gettingLinks = (textFile, file) => {

  let arrayLinks = [];

  const renderer = new marked.Renderer();

  renderer.link = (href, title, text) => {

    if (!href.startsWith('#')) {
      arrayLinks.push({ href, text: text.slice(0, 50), file });
      // console.log(arrayLinks)   
    }
  }
  marked(textFile, { renderer });

  //return arrayLinks;
 validateLinksAll(arrayLinks)
}


// Funcion que valida los links extraidos y retorna el status en numero y texto 

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

       log(chalk.green(element.file) + " " + chalk.cyan(element.href) + " " + chalk.yellow(element.status) + " " + chalk.magenta(element.statusText) + " " + chalk.white(element.text));
      
      });
  
       }
      
    }); 
    statsLinks(validateLinks)
   

}

const statsLinks = (linksStats) => {

  let hrefNewArray = [];

  linksStats.forEach(link => {
    hrefNewArray.push(link.href);
  });
  let uniqueLinks = new Set(hrefNewArray);


 log(chalk.blue("STATS:") + '\n' + chalk.magentaBright("TOTAL: " + hrefNewArray.length) + '\n' + chalk.green("UNIQUE: " + uniqueLinks.size))

  }


  module.exports = {
    validateLinksAll
  }
