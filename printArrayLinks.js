const printValidateAndStatFunction = require('./printValidateAndStatFunction.js');
module.exports = (arrayLinks, argumentOption, pathIn) => {
    arrayLinks.forEach(arrayFileMd => {
        printValidateAndStatFunction(arrayFileMd, argumentOption, pathIn);
    });
};