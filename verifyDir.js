const fs = require('fs');

module.exports = (route) => new Promise((resolve, reject) => {
    fs.stat(route, (error, stats) => {
        if (error && error.code === 'ENOENT') {
            reject(error);
            console.log('la ruta no existe')
        } else if (error) {
            reject(error);
        }
        if (!error && stats.isDirectory()) {
            return resolve(true);
        }
        return resolve(false);
    });
})