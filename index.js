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


// Path --> Evaluate the path, if it's Absolute will return it, and if it's Relative it will transform in Absolute

const pathTransform = (route) => {
    if (path.isAbsolute(route)) {
        return route
    } else {
        return path.resolve(route);
    }
};

// Save in variable the Path 
const filePath = pathTransform(routeConsole);
// console.log(filePath);


const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
const singleMatch = /\[([^\[]+)\]\((.*)\)/;



const links = (file, route) => {
    let arrayofRegEx= file.match(regexMdLinks);
    console.log(arrayofRegEx);
     arrayofRegEx.forEach((line) => {
      let lineLink= line.match(singleMatch);
      console.log(lineLink)
   }
   )
 
};


// Function with Promise to read File, and to later apply it in fileExtension Function

const readFilefromPath = (fileName, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, encoding, (err, data) => {
            if (err) {
                reject(err);
            } else {
                links(data, fileName);
            }
        });
    });
};


// Function to validate the extension of the file and apply the promise ReadFile, and get array that match with
// Regular Expresions

let fileData = [];
const regEx2= /\[(.+)\]\(([^ ]+?)( "(.+)")?\)/;
const regEx1 = /\[([^\[\]]*?)\]\((\S*?)\)/gsi;

fileExtension = (route) => {
    if (path.extname(route) === '.md') {
        readFilefromPath(route, 'utf-8')
            .then(res => {
                console.log(res);
                // // let fileData= [];
                // // fileData.push(res);
                // console.log('El archivo dice' + ':' + res);
                // // const linksData= res.match(regEx);
                // // // console.log(linksData);
                // // fileData.push(linksData);
                // // console.log(fileData);
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        return console.log('No puedes seguir por acá')
    }
    return 
};

// Variable that has the result of fileExtension function

const fileForLinks= fileExtension(filePath);

console.log(fileForLinks);

// Function to search only links 

const searchLinks = (file) =>{
    let onlyLinks= [];
  fileForLinks.forEach(file => {
      if('https' === 'https'){
        
      }
      
  });
}




