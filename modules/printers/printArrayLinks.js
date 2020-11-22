const printValidateAndStatFunction = require('./printValidateAndStatFunction.js');

module.exports = (arrayLinks, argumentOption, pathIn) => {
    const newArray = arrayLinks.map(arrayFileMd => {
        return printValidateAndStatFunction(arrayFileMd, argumentOption, pathIn);
    });    
    return Promise.all(newArray).then(resp=>{      
        return resp;
    });
    
};