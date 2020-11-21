#!/usr/bin/env node


const fs = require('fs');
const path = require('path');
const fetch = require("fetch");
const fetchUrl = fetch.fetchUrl;



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
        return path.normalize(path.resolve(route));
    }
};


// Save in variable the Path 
const filePath = pathTransform(routeConsole);
// console.log(filePath);

// Const with Regular Expresions to Match in file 
const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
const singleMatch = /\[([^\[]+)\]\((.*)\)/;

// Function to get Links, text and path from File. It will be called in Promise ReadFile

const links = (file, route) => {
    let arrayofRegEx = file.match(regexMdLinks);
    const onlyInfoLinks= [];
    arrayofRegEx.forEach((line) => {
        let lineLink = line.match(singleMatch);
        let http = lineLink[2].includes('http');
        //  console.log(http);
        if (http) {
            onlyInfoLinks.push({ href: lineLink[2], text: lineLink[1], path: route })
        }

    });
    
    //    console.log(onlyInfoLinks);
    return onlyInfoLinks;
};



// Function with Promise to read File, and to later apply it in fileExtension Function

const readFilefromPath = (fileName, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, encoding, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(links(data, fileName));
            }
        });
    });
};


// Function to validate the extension of the file and apply the promise ReadFile
const fileExtension = (route) => {
    if (path.extname(route) === '.md') {
        readFilefromPath(route, 'utf-8')
            .then(res => {
                const objectWithInfo =res;
                console.log(objectWithInfo);

            })
            .catch(err => {
                console.log(err);
            });
    } else {
        return console.log('No puedes seguir por acá')
    }
    // return onlyInfoLinks;
};

// Variable that has the result of fileExtension function

const fileForLinks = fileExtension(filePath);









