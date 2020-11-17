const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

// Module should get if it has recived a file or directory
module.exports = (pathIngresada) => {
    // Use stat() method 
    return new Promise((resolve, rejects)  =>{
        fs.stat(
            pathIngresada, 
            (err, stats) => {
            if (!err) {
                resolve({
                    typePathFile: stats.isFile(),
                    typePathDir:  stats.isDirectory()
                }) 
                /* if (stats.isFile()) {
                    console.log('is file ? ' + stats.isFile());
                }
    
                else if (stats.isDirectory()) {
                    console.log('is directory? ' + stats.isDirectory()); 
                }*/
            }
            else
                rejects(err);
        });
    })
    
}; 