const fs = require('fs');

module.exports = (route) => new Promise((resolve, reject) => {
    fs.readdir(route, (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  })