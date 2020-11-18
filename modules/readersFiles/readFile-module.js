//Module should read file md and its links
const fs = require('fs');
const path = require('path');

//  Read file and get data
const readFileMod = (pathFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            pathFile,
            'utf-8',
            (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            }
        )
    });
};

module.exports = {
    readFileMod
}

