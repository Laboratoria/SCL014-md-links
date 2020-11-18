const readFileAndReturnArray = require('./readFileAndReturnArray.js');
const readDirectoryAndReturnArray = require('./readDirectoryAndReturnArray');

module.exports=(resp, pathIn, argumentOption) => {
    if (resp.typePathFile === true && resp.typePathDir === false) {
        return readFileAndReturnArray(pathIn, argumentOption);

    } else if (resp.typePathDir === true && resp.typePathFile === false) {
        return readDirectoryAndReturnArray(pathIn, argumentOption);
    }
};