const fs = require('fs');
const { JSDOM } = require('jsdom');
let md = require('markdown-it')();
const axios = require('axios');

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
        infoArray.forEach(enlace => {
            console.log(enlace.href)
            getHttp(enlace.href)

        });

    };


    function getHttp(link) {


        if (link.startsWith("http")) {

            axios.get(link)
                .then(response => {
                    console.log("-------");
                    console.log(response.status);
                    //console.log(response);
                    console.log("-------");
                })
                .catch(error => {
                    console.log("****************************");
                    console.log(error.response.status);
                    console.log("****************");
                });


        } else {

            console.log("link es un about");

        }
    }







};










