const readFileAndReturnArray = require('./readersFiles/readFileAndReturnArray.js');
const readDirectoryAndReturnArray = require('./readersFiles/readDirectoryAndReturnArray');

module.exports=(resp, pathIn) => {
    if (resp.typePathFile === true && resp.typePathDir === false) {
        return readFileAndReturnArray(pathIn);

    } else if (resp.typePathDir === true && resp.typePathFile === false) {
        return readDirectoryAndReturnArray(pathIn);
    }
};