module.exports = () => {
  // ...
};
const marked = require("marked");
let dir = require('node-dir');
const fs = require('fs');
const pathC = require('path');
const { resolve } = require('path');
const { argv } = require('process');
let path = process.argv[2];
path = pathC.resolve(path);
path = pathC.normalize(path);
let options = {
  validate: false
};

// const ext = '.' + process.argv[3]; 
// const pathMd = ext.toString()

// let pathMd = process.argv[3];


// Detalles y nombre del directorio
// let pathObj = pathC.parse(__filename); 

// console.log(pathObj);


// lee archivos en directorio, muestra array con archivos existentes dentro y muestra los que tienen extension ".md"

const readDir = (__dirname => {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, subdirs) => {
      if (err) {
        reject(console.log(err, "El directorio esta vacio"))
      }
      resolve(subdirs);
      // console.log(subdirs)

      subdirs.forEach(file => {
        if (pathC.extname(file) === ".md") {
          // console.log(file)
          readFiles(path)
          
            .then(res => {
              console.log("hola", res);
            })
            .catch(err => {
              console.log(err, "Este no es un archivo Markdown. Por favor ingresa una ruta valida");
            })
        }
      })

    })
  })
})
readDir(__dirname);


// Lee el contenido del archivo abierto para poder luego extraer los links

// const readding = (path) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, 'utf8', (err, data) => {
//       if (err) {
//         reject(console.log(err, "hola"))
//       } else {
//         resolve(data);
        
//         // console.log(data)
//       }
//     })
//   })
// }

// readding(path)




//   }
//     })
//   };

//   marked.setOptions({
//    renderer,
//   });
// })

//   marked(he.decode(content));

//   return sections;
//  }



// mdLinks("./some/example.md", { validate: true })
//   .then(links => {
//     // => [{ href, text, file, status, ok }]
//   })
//   .catch(console.error);
// const mdLinks = require('md-links');

// mdLinks("subdirs")
//   .then(links => {
//     console.log(links)
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);

// mdLinks("./some/example.md", { validate: true })
//   .then(links => {
//     // => [{ href, text, file, status, ok }]
//   })
//   .catch(console.error);

// mdLinks("./some/dir")
//   .then(links => {
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);



// Funcion que lee archivos de extension ".md"
const readFiles = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {

      if (err) {
        reject(console.log(err, "El directorio esta vacio"))
      }
      resolve(data);
      // console.log(subdirs)
      // if (pathC.extname(path) === ".md") {
      //   console.log(pathC.extname(path) === ".md")
      //   resolve(readDir(__dirname))
      //   resolve(console.log("hola"))

      // } 
      // else {
      //   reject(console.log(err, "Este no es un archivo Markdown. Por favor ingresa una ruta valida"));
      //   // console.log(readFiles(path))
      // }
      // if (pathC.extname(path) === ".md") {
      //   console.log(data)
      //  resolve(readFiles(path))
      //   .then(res => {
      //     console.log("hola", res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
      // }
      // reject(console.log(err, "Este archivo no es de tipo Markdown, ingresa otro"));

    })

  })
}

readFiles(path)

const gettingLinks = () => {
  return new Promise((resolve, reject) => {
    readFiles(path)
    .then((path) => {
     let arrayLinks = []; 
     const renderer = new marked.Renderer();
     renderer.link = function (href, text, file) {
      arrayLinks.push({ href: href, text: text, file: path, });
      // console.log(arrayLinks.push())
    
    console.log(arrayLinks)
  }

    })
  } )
}
gettingLinks()
// const gettingLinks = (path) => {
//   // console.log(path)
//   return new Promise((resolve, reject) => {
//     readDir(__dirname)
//     console.log(readDir(__dirname))
//     .then((data) => {
//       // console.log((data))
//     let arrayLinks = [];
    
//     const renderer = new marked.Renderer();
//     console.log(renderer)
//     renderer.link = function (href, text, file) {
//       // console.log(renderer.link)
    
//       arrayLinks.push({ href: href, text: text, file: path, });
//       // console.log(arrayLinks.push())
//     };
//     marked(data, { rendered: renderer});
    
//     console.log(arrayLinks) 
//           resolve(data, arrayLinks);
//         })
//         .catch((err) => {
//         reject(err);
//         console.log(arrayLinks) 
//     })
    
//   })
  
// }

// gettingLinks(path)








