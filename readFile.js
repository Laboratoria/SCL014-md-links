const fs = require('fs');
const regEx = /\(https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*\)/gi;
const regExText = /\[(\w.*?)]\(h|\[(`\w.*?`)]\(h/gi;
const regExAll = /\[(\w.*?)]\(https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*\)|\[(`\w.*?`)]\(https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*\)/gi;

module.exports = (file, route) => new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (error, file) => {
        if (error) {
            reject(error);
        } else {
            let linksAndTexts = file.match(regExAll);
            if (linksAndTexts != null) {
                let arrAll = Array.from(linksAndTexts);
                let arrLinks = [];
                arrAll.forEach(link => {
                    let links = link.match(regEx).toString().replace(/\(|\)/gi, '');
                    let text = link.match(regExText).toString().replace(/\[`|\`]\(h|\[|\]\(h/gi, '');
                    let objectLinks = { 'href': links, 'text': text, 'file': route };
                    arrLinks.push(objectLinks);
                })
                resolve(arrLinks)
            } else {
                console.log('No se encontraron links');
            }
        }
    })
})
