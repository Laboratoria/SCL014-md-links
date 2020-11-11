// module.exports = () => {
//   // ...
// };
// para obtener rutas de archivo
const path = require('path')
// para poner colores en las lineas de comando
const chalk = require('chalk');
// para poder leer los archivos y asi verificar que existen
const fs = require('fs');
// para crear el servicio
const http = require('http');
//este lo isntale para encontrar en el sistema de archivos
const filehound=require ('filehound');
//aprendiendo a usar process
const process= require('process');
// console.log(process.argv);
//aqui podrias obtener el valor index de la matriz y saber cual requieres usar
const args = process.argv; 
//devuelve una matriz que contiene los argumentos de la línea de comandos pasados cuando
// se inició el proceso Node.js.  

console.log("number of arguments is "+args.length); 
  
args.forEach((val, index) => { 
   console.log(`${index}: ${val}`); 
 }); 



// // Grab provided arguments
// const [, sourcePath, ...args] = process.argv;
// //camino absoluto path.resolve([...caminos])
// //arregla el camino path.normalize(camino)

// //imprime lo que se escribe en la linea de comando
 //console.log(`Hola por favor ingresa su ruta`)
// //console.log(`ruta archivo ${sourcePath}`);

 //console.log(`ruta ${args}`);
// //console.log(`path ${path}`);
 // //console.log(`bin ${bin}`);
///////node process-args.js one two=three four
let script_path = process.argv[1];
console.log("SCRIPT:", script_path);



// //saquemos la ruta de usuario al archivo
 //let userPathToFile= process.argv[2];
 //console.log("PATH:", userPathToFile);
 //let firstOption = process.argv[3];
 //console.log("FIRST OP:" ,firstOption);
 //let secondOption = process.argv[4];
 //console.log("SECOND OP:" ,secondOption);
////El path.normalize()método normaliza una ruta especificada.
 //userPathToFile = path.normalize(userPathToFile);


//comprobar si existe un archivo o directorio /asincrono

fs.stat('./README.md', function(err) {
    if (!err) {
        console.log('file or directory exists');
    }
    else if (err.code === 'ENOENT') {
        console.log('file or directory does not exist');
    }
});

//encuentrar archivo en el sistema
const files = filehound.create()
    .discard("node_modules") //saca la carpeta
    .paths("./")
    .ext("md")
    .find();

files.then(console.log);
