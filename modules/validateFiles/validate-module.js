const fetch = require('node-fetch');
const statsModule = require('../statsFiles/validateStats-module.js');

//Module should validate links from md file read
module.exports = (arrayMdContent, option, pathgive) => {
    const arrayLinks = arrayMdContent;
    const validateObj = arrayLinks.map(obj => {
        return fetch(obj.href)
            .then(resp => {
                return {
                    href: resp.url,
                    status: resp.status,
                    statusText: resp.statusText,
                    text: obj.text,
                    file: obj.file
                };
            });
    })
    return Promise.all(validateObj).then(resp => {
        statsModule(resp, option, pathgive);
        return resp; 
    }).catch(reason => {
        console.log('Error: ' + reason);
    });

};