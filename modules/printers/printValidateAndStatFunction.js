const validateModule = require('../validateFiles/validate-module.js');
const statsModule = require('../statsFiles/stats-module.js');

module.exports = ((arrayFileMd, argumentOption, pathIn) => {
    if (argumentOption.stats === true && argumentOption.validate === true) {
        return validateModule(arrayFileMd, argumentOption, pathIn);
    }
    else if (argumentOption.validate === true) {
        return validateModule(arrayFileMd, argumentOption, pathIn);
    }
    else if (argumentOption.stats === true) {
        return statsModule(arrayFileMd, argumentOption, pathIn);
    }
    return arrayFileMd;
});
