const fs = require('fs');
const { JSDOM } = require('jsdom');
let md = require('markdown-it')();
const axios = require('axios');

const mdLinks = (filePathmdarray, validate, stats) => {

    const infoArray = new Array;


    //Funcion que lee el archivo
    const readFile = (filePathmd) => {
        return new Promise((resolve, reject) => {

            fs.readFile(filePathmd, 'utf-8', (err, data) => {
                if (err) {
                    reject(console.log('error :', err));

                } else {
                    resolve(
                        (showLinks2(data, filePathmd))
                    )

                }
            });


        });

    };


    filePathmdarray.forEach(path => readFile(path));


    const showLinks2 = (data, filePathmd) => {

        const files = md.render(data.toString());
        const dom = new JSDOM(files);
        const listNode = dom.window.document.querySelectorAll('a');
        const arrayListNode = Array.from(listNode);
        let objectArray = new Object;
        arrayListNode.map((a) => {
            objectArray = {
                href: a.href,
                text: a.text,
                file: filePathmd,

            }
            infoArray.push(objectArray);

        });

        validateLinks();
        printResultsTable();


    };
    const validateLinks = () => {
        infoArray.forEach(enlace => {
            console.log(enlace.href)

            if (enlace.href.startsWith("http")) {
                axios.get(enlace.href)
                    .then(response => {
                        enlace.status = response.status;
                        console.log(enlace)

                    })
                    .catch(error => {
                        console.log(error.response.status);
                        return error.response.status;
                    })
            } else {
                return ("link es un about");

            }
        })
        printResultsTable();
    }

    const printResultsTable = () => {
        console.table(infoArray, ['href', 'file', 'status']);

    };


}

module.exports = mdLinks;















