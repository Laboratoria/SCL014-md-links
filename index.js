module.exports = () => {
  // ...
};

const marked = require('marked');
let dir = require('node-dir');
const fs = require('fs');
const path = require('path');
const { Console } = require('console');
let pathC = process.argv[2];
pathC = path.normalize(path.resolve(pathC));

// lee archivos en directorio, muestra array con archivos existentes dentro y los que tienen extension ".md"

const readDir = (__dirname => {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, subdirs) => {
      if (err) {
        reject(console.log(err, "El directorio esta vacio"))
      }
      resolve(subdirs);
      //console.log(subdirs)

      subdirs.forEach(file => {
        if (path.extname(file) === ".md") {
          console.log(file)
          readFiles()

            .then(res => {
              console.log("hola", res);
            })
            .catch(err => {
              console.log(err, "Este no es un archivo Markdown, ingresa una ruta valida");
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
const Function = (route) => {

  if (fs.existsSync(route)) {
    console.log('La ruta existe')
    try {
      const dir = fs.lstatSync(route).isDirectory()
      fs.lstatSync(route).isDirectory()
      if (dir) {
        readDir(route)
          .then(res => {
            console.log("hola", res);
          })
          .catch(err => {
            //console.log(err, "Este no es un archivo Markdown");
          })
      }
      else {
        readFiles(route)
          .then(res => {
            console.log("hola", res);
          })
          .catch(err => {
            // console.log(err, "Este no es un archivo Markdown");
          })
      }
    } catch (e) {
      // Handle error
      if (e.code == 'ENOENT') {
        //no such file or directory
        //do something
      } else {
        //do something else
      }
    }
  }
}

principalFunction(pathC)



const gettingLinks = (textFile, file) => {
 
  let arrayLinks = [];
  const renderer = new marked.Renderer();

  renderer.link = (href, title, text) => {
    if (!href.startsWith('#')) {
      arrayLinks.push({ href, text, file });
      // console.log(arrayLinks)

    }
  }

  marked(textFile, { renderer });

  return arrayLinks;
 

}














