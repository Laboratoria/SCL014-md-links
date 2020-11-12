const fetch = require('node-fetch');
//Module should validate links from md file read
module.exports = (arrayMdContent) => {
    const arrayLinks = arrayMdContent;
    const validateObj = arrayLinks.map(obj => {
        return fetch(obj.href)
        /* .then(resp => {
            console.log(resp);
        }); */
    })
    Promise.all(validateObj).then(resp => {
        resp.forEach(link => {
            console.log(link.url + ' ' + link.status + ' ' + link.statusText);           
        });
    }).catch(reason => {
        console.log(reason)
    });
};