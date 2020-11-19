const readFileFunction = require('./readFileFunction-module.js');
module.exports = (pathIn => {
    return readFileFunction(pathIn)
        .then(respuesta => {
            return [respuesta];
        });
});