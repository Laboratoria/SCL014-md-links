//Modulo debe Leer un directorio y su archivos md
const fs = require('fs');
const path = require('path');

const paseMdFile = require('./parseMdFile-module.js');

//  Read Directory and get .Md files ext
const readDirMod = (pathDir) => {
    const pathExtName = '.' + 'md';
    fs.readdir(
        pathDir,
        'utf-8',
        (error, files) => {
            if (error) {
                paseMdFile(error);
            }
            else {
                const dataFiles = files;
                const dataFilter = dataFiles.filter(file => {
                    return path.extname(file) === pathExtName;
                })
                paseMdFile(dataFilter);
            }
        }
    )

};

module.exports = {
    readDirMod
}