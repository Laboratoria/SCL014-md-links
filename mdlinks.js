const fs = require('fs');
const { JSDOM } = require('jsdom');
let md = require('markdown-it')();
const fetchUrl = require("fetch").fetchUrl;

const mdLinks = (filePathmdarray, validate, stats) => {

    const infoArray = new Array;

    //Funcion que lee el archivo
    const readFile = (filePathmd) => {
        return new Promise((resolve, reject) => {
            let fileDataAndPath = new Object;
            fs.readFile(filePathmd, 'utf-8', (err, data) => {
                if (err) {
                    reject(console.log('error :', err));
                } else {
                    fileDataAndPath = {
                        data: data,
                        file: filePathmd
                    }
                    resolve(fileDataAndPath);
                }
            });
        });
    };


    const getStatus = (url) => {
        return new Promise((resolve, reject) => {
          fetchUrl(url, (error, resp) => {
            if (resp) {
              resolve(resp.status);
            } else {
              reject(error)
            }
          });
        });
      };


    const validateLinks2 = (dataArray, validateFlag) => {
        return new Promise((resolve, reject) => {

        if (!validateFlag){
            printResultsTableshort(dataArray);
        }
        else {
            let responseArray = new Array;
            for (let i = 0; i < dataArray.length; i++) {
                let url = dataArray[i].href
                responseArray.push(() => getStatus(url));
            }
            const arrayOfPromises = responseArray.map(responseArray => responseArray())
            let linksResponses = Promise.all(arrayOfPromises)
            .then(lista => {
                for (let i = 0; i < lista.length; i++) {
                    let code = lista[i];
                    dataArray[i].status = code;
                }
                printResultsTableLong(dataArray)
            });                     
        }
    });
    }

    const printResultsTableshort = (infoArray) => {
        console.table(infoArray, ['file', 'text', 'href']);
        if (stats) printStats(infoArray, false)

    };

    const printResultsTableLong = (infoArray) => {
        console.table(infoArray, ['file', 'text', 'href', 'status']);
        if (stats) printStats(infoArray, true) 
        
    };

    const printStats = (infoArray, stats) => {
        let broken = 0;
        infoArray.forEach(function(element) { 
            if(element.status!==200){
            broken = broken +1;}
            });
        let total = infoArray.length;
        let uniqs = infoArray.filter(function (item, index, array) {
            return array.indexOf(item) === index;
        }).length;
        console.log('-----------------')
        console.log('Total: ' + total)
        console.log('Unique: ' + uniqs)
        if (stats) console.log('Broken: ' + broken)
    };



    //Funcion que lee el archivo
    const readFiles = (filePathmdarray) => {
        let simpleArray = new Array();
        for (let i = 0; i < filePathmdarray.length; i++) {
            simpleArray.push(() => readFile(filePathmdarray[i]));
          }
        const arrayOfPromises = simpleArray.map(simpleArray => simpleArray())
        return arrayOfPromises;
        };

    //Funcion que extrae los links de la data
    const extractLinks = (objectarray) => {
        return new Promise((resolve, reject) => {
        let infoArray = new Array;
        for (let i = 0; i < objectarray.length; i++) {
                const files = md.render(objectarray[i].data.toString());
                const dom = new JSDOM(files);
                const listNode = dom.window.document.querySelectorAll('a');
                const arrayListNode = Array.from(listNode);
                let objectArray = new Object;
                arrayListNode.map((a) => {
                    objectArray = {
                        href: a.href,
                        text: a.text,
                        file: objectarray[i].file,
                    }
                    if (objectArray.href.startsWith("http")) {
                        infoArray.push(objectArray);
                    }
                })};    
        if (infoArray !== 'undefined' ) {
            resolve(infoArray);
        }else {
            reject(console.log("error!?!?!?!?"));
        }   
        });
        };

 



const promesa =  readFiles(filePathmdarray);   
const res = Promise.all(promesa)
.then(result => extractLinks(result)).then(bla => { 
    validateLinks2(bla, validate)
})
  

}
module.exports = mdLinks;






