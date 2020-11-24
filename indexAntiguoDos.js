#!/usr/bin/env node
console.log("hola mundo node desde index.js")
const path = require('path')

//para obtener rutas de archivos
const pathToFile = process.argv[2];
console.log("console.log"+pathToFile)



console.log(
  " ---------------------------------------- MD-LINKS RESULT ---------------------------------------- ");

console.log(("FILE NAME: ") + (pathToFile));
//transforma ruta absoluta en relativa// debe ir en esta posicion para que despues muestre la ruta absoluta
//path.resolve y path.normalize

const convAbsolute= path.resolve(pathToFile);
const convNormalize= path.normalize(convAbsolute);
console.log(convNormalize)
console.log(("FILE PATH: ") + (convNormalize) + "\n");
//console.log("PATH:", pathToFile);


