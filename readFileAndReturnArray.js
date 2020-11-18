const readFileFunction = require('./readFileFunction-module.js');
module.exports = ((pathIn, argumentOption) => {
    return readFileFunction(pathIn, argumentOption)
        .then(respuesta => {
            return [respuesta];
        });
});