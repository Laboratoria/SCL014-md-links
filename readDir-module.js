//Module should read directory, its files md and its links
const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');

const paseMdFile = require('./parseMdFile-module.js');

//  Read Directory and get .Md files ext
const readDirMod = (pathDir) => {
    return new Promise((resolve, rejects) => {
        const pathExtName = '.' + 'md';
        fs.readdir(
            pathDir,
            'utf-8',
            (error, files) => {
                if (error) {
                    rejects(error);
                }
                else {
                    const dataFiles = files;
                    const dataFilter = dataFiles.filter(file => {
                        return path.extname(file) === pathExtName;
                    })
                    resolve(dataFilter);
                }
            }
        )

    })

};

module.exports = {
    readDirMod
}