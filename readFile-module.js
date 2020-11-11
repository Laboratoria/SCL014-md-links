//Modulo debe Leer un archivo md y sus links
const fs = require('fs');
const path = require('path');

const parseMdFile = require('./parseMdFile-module.js');

//  Read file and get data
const readFileMod = (pathFile) => {
    fs.readFile(
        pathFile,
        'utf-8',
        (error, data) => {
            if (error) {
                parseMdFile(error, null);
            }
            else {                
                parseMdFile(null, data.toString());
            }
        }
    )

};

module.exports = {
    readFileMod
}