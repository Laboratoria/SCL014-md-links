const validateModule = require('./validate-module.js');
const statsModule = require('./stats-module.js');

module.exports=((arrayFileMd, argumentOption, pathIn) => {
    if (argumentOption === '--validate') {
        validateModule(arrayFileMd, argumentOption, pathIn);
    }
    else if (argumentOption === '--stats') {
        statsModule(arrayFileMd, argumentOption, pathIn);
    } else if (argumentOption === '--stats --validate' || argumentOption === '--validate --stats') {
        validateModule(arrayFileMd, argumentOption, pathIn);
    }
});
