const { readFileMod } = require('./readFile-module.js');
const parseMdFile = require('./parseMdFile-module.js');
const validateModule = require('./validate-module.js');
const statsModule = require('./stats-module.js');

module.exports= (pathGive, argumentOption) =>{
    readFileMod(pathGive)
    .then(dataObject => {
        return parseMdFile(dataObject, pathGive);
    })
    .then(arrayLinks => {
        if (argumentOption === '--validate') {
            validateModule(arrayLinks, argumentOption, pathGive);
        }  
        else if (argumentOption === '--stats') {
            statsModule(arrayLinks, argumentOption, pathGive);
        }else if (argumentOption === '--stats --validate' || argumentOption === '--validate --stats') {
            validateModule(arrayLinks, argumentOption, pathGive);
        }
   
    }).catch(error =>{
        console.log('Error:  ' + error);
    });
};

// Fuction Read file 
/* readFileMod(pathIn)
    .then(dataObject => {
        return parseMdFile(dataObject, pathIn);
    })
    .then(arrayLinks => {
        if (argumentOption === '--validate') {
            validateModule(arrayLinks, argumentOption);
        }  //return validateModule(arrayLinks)
        else if (argumentOption === '--stats') {
            statsModule(arrayLinks, argumentOption);
        }else if (argumentOption === '--stats --validate' || argumentOption === '--validate --stats') {
            validateModule(arrayLinks, argumentOption);
        }
   
    }).catch(error =>{
        console.log('Error:  ' + error);
    }); */