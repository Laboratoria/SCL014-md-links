const { readFileMod } = require('./readFile-module.js');
const parseMdFile = require('../parseFiles/parseMdFile-module.js');


module.exports= (pathGive) =>{
    return readFileMod(pathGive)
    .then(dataObject => {
        return parseMdFile(dataObject, pathGive);
    }).catch(error =>{
        console.log('Error:  ' + error);
    });
};