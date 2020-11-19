const validateModule = require('../validateFiles/validate-module.js');
const statsModule = require('../statsFiles/stats-module.js');

module.exports = ((arrayFileMd, argumentOption, pathIn) => {
    if (argumentOption.stats === true && argumentOption.validate === true) {
        validateModule(arrayFileMd, argumentOption, pathIn);
    }
    else if (argumentOption.validate === true) {
        validateModule(arrayFileMd, argumentOption, pathIn);
    }
    else if (argumentOption.stats === true) {
        statsModule(arrayFileMd, argumentOption, pathIn);
    }
});
