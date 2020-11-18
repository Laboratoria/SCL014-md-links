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
            }
            else
                rejects(err);
        });
    })
    
}; 