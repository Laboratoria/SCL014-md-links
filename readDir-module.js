//Module should read directory, its files md and its links
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
                paseMdFile(error, null, pathDir);
            }
            else {
                const dataFiles = files;
                const dataFilter = dataFiles.filter(file => {
                    return path.extname(file) === pathExtName;
                })
                paseMdFile(null, dataFilter, pathDir);
            }
        }
    )

};

module.exports = {
    readDirMod
}