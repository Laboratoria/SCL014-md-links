// module.exports = () => {
//   // ...
// };

const fs = require('fs');
const path = require('path');

/* Obtener información de linea de comando */
let textConsole = process.argv[2];
console.log(textConsole);

// Ruta Archivo, False si es relativa / True si es absoluta

let pathAbsolute = path.isAbsolute(textConsole);
console.log(pathAbsolute);

// Extensión de archivo
let fileExtension= path.extname(textConsole);
console.log(fileExtension);

// Leer Archivo 

let readFile = fs.readFile(textConsole, 'utf-8', (error, data) =>{
 if(error) throw error;
    console.log(data);
    console.log(data.link);
});



// const getLinks = (file) => {
//      readFile.forEach((file) => {
//          if ('https://' === 'https://'){
//              console.log(file);
//          }
//      });
//  };






// // Leer directorios y trae archivos del directorio!
// fs.readdir(textConsole, (files) =>{
//   files.forEach(file =>{
//       console.log(file);
//       console.log(path.extname(file));
//   });
// });

// Obtener extension de path
// console.log(path.extname(textConsole));


