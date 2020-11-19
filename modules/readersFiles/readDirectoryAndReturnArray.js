const { readDirMod } = require('./readDir-module.js');
const readFileFunction = require('./readFileFunction-module.js');

module.exports = (pathIn => {
    return readDirMod(pathIn)
        .then(resp => {
            const arrayResp = resp.map(fileMd => {
                return readFileFunction(pathIn + '/' + fileMd);
            });
            return Promise.all(arrayResp)
                .then(resp => {
                    return resp;
                });
        });
});