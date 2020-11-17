const fs = require('fs');
const { JSDOM } = require('jsdom');
let md = require('markdown-it')();
const axios = require('axios');
const { info } = require('console');

module.exports = (filePathmdarray, validate, stats) => {

    const infoArray = new Array;

    filePathmdarray.forEach(path => readFile(path));


    function resultsTable(data, validate) {
        let headers = ['ruta', 'links', 'texto']
        console.log(headers);
    };

    function readFile(filePathmd) {
        //Funcion que lee el archivo
        fs.readFile(filePathmd, 'utf-8', (err, data) => {
            if (err) {
                console.log('error :', err);

            } else {
                console.log('Contiene un archivo');
                console.log(showLinks2(data, filePathmd));

            }
        });
    };


    function showLinks2(data, filePathmd) {
        const files = md.render(data.toString());
        const dom = new JSDOM(files);
        const listNode = dom.window.document.querySelectorAll('a');
        const arrayListNode = Array.from(listNode);

        let objectArray = new Object;
        arrayListNode.map((a) => {
            objectArray = {
                href: a.href,
                text: a.text,
                file: filePathmd
            }
            infoArray.push(objectArray);

        });
        infoArray.forEach(enlace => {
            console.log(enlace)
            getHttp(enlace.href)


        });
        printResultsTable();

    };

    function getHttp(link) {
        if (link.startsWith("http")) {
            axios.get(link)
                .then(response => {
                    console.log(response.status);
                    return response.status;
                })
                .catch(error => {
                    console.log(error.response.status);
                    return error.response.status;
                })
        } else {
            return ("link es un about");

        }
    }

    function printResultsTable() {
        console.table(infoArray);




    };

};















