// Video de promesas de Alpi

// Require from Fetch Library

const fetch= require("fetch");
const fetchUrl = fetch.fetchUrl;
const fs = require('fs');

// 1er tipo de promesa- Instant Resolved Promise 
// Se llama a resolve, el que debería ser cuando esta 
// resuelto. 
// En esta primera forma se devuelve un objeto "promisificado"
let myPromise = Promise.resolve('Hola Cata!');
// Ahora se llama a la promesa con su metodo then 
myPromise.then(res =>{
    console.log(res)
});

//2do tipo de promesa - el return de la promesa 
// Declaración promesa
 let myOtherPromise = new Promise ((resolve, reject) => {
     setTimeout(()=> resolve(10), 2000);
 });

 // Llamado promesa 
 myOtherPromise.then(res =>{
     res = res*500;
     console.log(res);
 });

 // 3era promesa fetchURL declaración de promesa con resolve y reject

 const getHttpStatus = (url) => {
     return new Promise((resolve, reject) => {
        fetchUrl(url, (error, meta, body) => {
            if(error) {
                reject(error)
            } else {
                resolve(meta.status);
            }
        });
     })
 }

let url = 'https://www.google.com';
// let url = 'https://www.go930424893840ogle.com';

// Llamado de promesa con fetch (resolve) y con catch (reject)
getHttpStatus(url)
    .then(res => {
        console.log('El estado de', url, 'es:', res)
    })
    .catch(err =>{
        console.log(err)
    });

//  4ta Promesa = READFILE como promesa

const readAFile = (fileName, encoding) =>{
    return new Promise((resolve, reject) =>{
        fs.readFile(fileName, encoding,(err,data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
          });
    });
};

readAFile('README.md', 'utf-8')
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err);
    });



