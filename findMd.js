const path = require('path');
let par;

module.exports = (data, route) => {
    data.forEach((file) => {
        let extFile = path.extname(file);
        if (extFile === '.md') {
            Promise.resolve(par = { file, route });
        } else {
            console.log('no hay archivos .md');
        }
    })
    return par;
}