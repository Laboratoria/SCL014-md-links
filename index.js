#!/usr/bin/env node


const fs = require('fs');
const path = require('path');
const fetch = require("fetch");
// const { on } = require('process');
const fetchUrl = fetch.fetchUrl;
const colors = require('colors');
const { resolve } = require('path');



/* Info from CLI */
// Get the route of the file or file directory
let routeConsole = process.argv[2];
// console.log(routeConsole);
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

// Promise to get HTTP STATUS

const getHttpStatus = (url) => {
    return new Promise((resolve, reject) => {
        fetchUrl(url, (error, meta, body) => {
            if (error) {
                reject(error)
            } else {
                resolve(meta.status);
            }
        });
    })
};

const getStatsHTTP = (array) => {
    return new Promise ((resolve, reject) => {
        for (let index = 0; index < array.length; index++) {
            const total = array[index.length];
            console.log(total);
            
            
        }
    })
}


// Function to get Links, text and path from File. It will be called in Promise ReadFile

const links = (file, route) => {
    let arrayofRegEx = file.match(regexMdLinks);
    const onlyInfoLinks = [];
    arrayofRegEx.forEach((line) => {
        let lineLink = line.match(singleMatch);
        let http = lineLink[2].includes('http');
        if (http) {
            onlyInfoLinks.push({ href: lineLink[2], text: lineLink[1], path: route });
        }
    });
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
                let onlyInfoLinks = res;
                onlyInfoLinks.map((line) => {
                    let url = line.href;
                    let text = line.text;
                    let file = line.path;
                    // console.log(file + " " + url + " " + text);
                    if (optionsConsole === '--validate' || optionsConsole === '--v') {
                        getHttpStatus(url)
                            .then(res => {
                                console.log (` El estado de  ${url.magenta}  es ${res}`)
                                // ('El estado de', url.blue, 'es:', res.black)
                            })
                            .catch(err => {
                                console.log(err.path)
                            });
                    } else if ( optionsConsole === '--stats' || optionsConsole === '--s'){
                        let total = onlyInfoLinks.length;
                        console.log('El total de Links en el documento son' + total);
                    } 
                    else {
                        return console.log((` File: ${file.green} \n Link: ${url.yellow}   \n Text: ${text.white}`));
                    };
                });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        return console.log('No puedes seguir por acá')
    }
};

// Variable that has the result of fileExtension function

const fileForLinks = fileExtension(filePath);









