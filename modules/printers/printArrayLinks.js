const printValidateAndStatFunction = require('./printValidateAndStatFunction.js');

module.exports = (arrayLinks, argumentOption, pathIn) => {
    const newArray = arrayLinks.map(arrayFileMd => {
        return printValidateAndStatFunction(arrayFileMd, argumentOption, pathIn);
    });    
    if (argumentOption !==  true) {
        return arrayLinks;
    } 
    return Promise.all(newArray).then(resp=>{      
        return resp;
    });    
};