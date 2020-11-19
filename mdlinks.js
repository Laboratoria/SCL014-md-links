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
                        (showLinks(data, filePathmd))
                    )

                }
            });


        });
    };
    filePathmdarray.forEach(path => readFile(path));

    const showLinks = (data, filePathmd) => {

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
            if (objectArray.href.startsWith("http")) {
                infoArray.push(objectArray);
            }

        });
        validateLinks();
        printResultsTable();
        if (stats) { printStatsData() }
    };
    const validateLinks = () => {
        infoArray.forEach(enlace => {
            console.log(enlace.href)
            axios.get(enlace.href)
                .then(response => {
                    enlace.status = response.status;
                })
                .catch(error => {
                    enlace.status = error.response.status;
                    return error.response.status;
                })

        })

    }


    const printResultsTable = () => {
        console.table(infoArray, ['text', 'href']);
    };

    const printStatsData = () => {
        let broken = 1;
        let total = infoArray.length;
        let uniqs = infoArray.filter(function (item, index, array) {
            return array.indexOf(item) === index;
        }).length;
        console.log('-----------------')
        console.log('Total: ' + total)
        console.log('Unique: ' + uniqs)
        if (validate) { console.log('Broken: ' + broken) }
        console.log('-----------------')


    };

}

module.exports = mdLinks;















