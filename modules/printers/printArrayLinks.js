const printValidateAndStatFunction = require('./printValidateAndStatFunction.js');

module.exports = (arrayLinks, argumentOption, pathIn) => {
    const newArray = arrayLinks.map(arrayFileMd => {
        return printValidateAndStatFunction(arrayFileMd, argumentOption, pathIn);
    });
    if (argumentOption.stats === false && argumentOption.validate === false) {
        return arrayLinks;
    }
    return Promise.all(newArray).then(resp => {
        return resp;
    });

};