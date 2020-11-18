#!/usr/bin/env node

// module.exports = () => {
//   // ...
// };

const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');
const { errorMonitor } = require('stream');
// const MarkdownIt = require('markdown-it');

/* Info from CLI */
// Get the route of the file or file directory
let routeConsole = process.argv[2];
console.log(routeConsole);
// Get the options of information that the user wants
let optionsConsole = process.argv[3];
// console.log(optionsConsole);


// Ruta Archivo, False si es relativa / True si es absoluta

const pathTransform= (ruta) =>{
    if(path.isAbsolute(ruta) ){
        return ruta
    } else {
        return path.resolve(ruta); 
    }
};

// console.log(pathTransform(routeConsole));

const filePath = pathTransform(routeConsole);

const readFile = (file) =>{
    fs.readFile(file, 'utf-8', (error, data) =>{
        if (error) throw error;

        console.log(data);
    })
};



// Extensión de archivo

const fileExtension = (ruta) =>{
    if(path.extname(ruta) === '.md'){
        return readFile(ruta);
    }else{
        return console.log('No puedes seguir por acá')
    }
};

console.log(fileExtension(filePath));

// Expresiones Regulares para buscar links 
const regEx = /\[([^\[\]]*?)\]\((\S*?)\)/gsi;
const urlRegex = /(\b(http?|https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/igs;

// Leer Archivo 
// const dataFile = [];

// // const stringData= dataFile.toString();
// // console.log(stringData);

// const readLinks = dataFile.match(urlRegex);
// console.log(readLinks);

let dataLinks = [];

// const readFile= fs.readFile(routeConsole, 'utf-8', (error, data) => {
//     if (error) throw error;
//     let dataFile = data;
//     // console.log(dataFile);
//     let linkdData = dataFile.match(regEx);
//     // console.log(linkdData);
//     dataLinks.push(linkdData);
//     console.log(dataLinks);
    
// });

// const links = (dataLinks) =>{
//   for (let index = 0; index < dataLinks.length; index++) {
//       return 
      
//   }
// }

const linksToString = dataLinks.toString();
console.log(linksToString);
const linksString = linksToString.match(urlRegex);
console.log(linksString);





