#!/usr/bin/env node

// module.exports = () => {
//   // ...
// };

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

/* Obtener información de linea de comando */
let textConsole = process.argv[2];
console.log(textConsole);

// Ruta Archivo, False si es relativa / True si es absoluta

let pathAbsolute = path.isAbsolute(textConsole);
console.log(pathAbsolute);

// Extensión de archivo
let fileExtension= path.extname(textConsole);
console.log(fileExtension);

const regEx = /\[([^\[\]]*?)\]\((\S*?)\)/gsi;
// Leer Archivo 
let readFile= fs.readFile(textConsole, 'utf-8', (error, data) => {
    if (error) throw error;
    let dataFile = data;
    console.log(dataFile);
    let linkdData = dataFile.match(regEx);
    console.log(linkdData);
});
