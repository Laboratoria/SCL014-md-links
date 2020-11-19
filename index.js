const pathModule = require('./modules/path-module.js');
const printArrayLinks = require('./modules/printers/printArrayLinks.js');
const checkIfItIsFileOrDirectory = require('./modules/checkIfItIsFileOrDirectory.js');

// Function should Read file or directory and executed each module
module.exports = ((pathIn, argumentOption) => {
    return pathModule(pathIn)
        .then((resp) => checkIfItIsFileOrDirectory(resp, pathIn, argumentOption))
        .then((arrayLinks) => printArrayLinks(arrayLinks, argumentOption, pathIn))
        .catch(error => console.log('Error:  ' + error));
});