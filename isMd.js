const path = require('path');

module.exports = (route) => {
    let par;
    let fileExt = path.extname(route);
    if (fileExt === '.md') {
        let file = route;
        return Promise.resolve(par = { file, route });
    }
    else {
        console.log('no es un archivo .md');
    }
}