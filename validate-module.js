const fetch = require('node-fetch');
const objectLinks = require('./objectLinks-module.js');
const statsModule = require('./stats-module.js');

//Module should validate links from md file read
module.exports = (arrayMdContent) => {
    const arrayObjectLinksContent = []

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
    Promise.all(validateObj).then(resp => {
        const respuesta = resp.map(link => {
            // console.log(link);            
            console.log(link.file + ' ' + link.href + ' ' + link.status + ' ' + link.statusText + ' ' + link.text);
            return arrayObjectLinksContent.push(link);
        });
        objectLinks(arrayObjectLinksContent);
        statsModule(arrayObjectLinksContent);
    }).catch(reason => {
        console.log(reason)
    });

};