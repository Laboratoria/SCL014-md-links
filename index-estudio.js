// considera que siempre debes poner el mismo nombre a las constantes de acuerdo a lo que llames
// const fs= require ('fs');

// crear archivos y leerlos
 const fs=require ('fs');
const { resolve } = require('path');
// fs.writeFile('./texto.txt', 'linea dos', (error)=>{
//     if(error){
//         console.log(error);
//     }
//     console.log('archivo Creado');
// });

//vamos a leer datos y convertirlos en string
// fs. readFile('./texto.txt',(error, data)=>{
//     if(error){
//         console.log(error)
//     }
//     console.log(data.toString());
// })
// vamos a ver las promesas
// let myFirstPromise= Promise.resolve("hola mundo Node");
// myFirstPromise.then(response=>{
//     console.log(response);
// });
// let mySecondPromise= new Promise((response, reject)=>{
//     setTimeout(() => resolve(5),200)
// });
