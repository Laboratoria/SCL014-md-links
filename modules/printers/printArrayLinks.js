const printValidateAndStatFunction = require('./printValidateAndStatFunction.js');

module.exports = (arrayLinks, argumentOption, pathIn) => {
    return arrayLinks.forEach(arrayFileMd => {
        printValidateAndStatFunction(arrayFileMd, argumentOption, pathIn);
    });
    
};