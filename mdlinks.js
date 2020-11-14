const { info } = require('console');
const fs = require('fs');
const { JSDOM } = require('jsdom');
let md = require('markdown-it')();

module.exports = (filePathmdarray) => {

    filePathmdarray.forEach(path => readFile(path));


    function readFile(filePathmd) {
        //Funcion que lee el archivo
        fs.readFile(filePathmd, 'utf-8', (err, data) => {
            if (err) {
                console.log('error :', err);
                return false;
            } else {
                console.log('Contiene un archivo');
                console.log(showLinks2(data, filePathmd));
                return true;
            }
        });
    };


    function showLinks2(data, filePathmd) {
        const files = md.render(data.toString());
        const dom = new JSDOM(files);

        const listNode = dom.window.document.querySelectorAll('a');
        const arrayListNode = Array.from(listNode);
        const infoArray = new Array;
        let objectArray = new Object;
        arrayListNode.map((a) => {
            objectArray = {
                href: a.href,
                text: a.text,
                file: filePathmd

            }
            infoArray.push(objectArray);

        });
        console.log(infoArray);
    }





}














