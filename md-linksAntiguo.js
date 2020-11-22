#!/usr/bin/env node
//esto se llama Se llama shebang . Básicamente le dice 
//al sistema que esto no es un script de shell y que debe usar un intérprete diferente.
// module.exports = () => {
//   // ...
// };
console.log("Hola Marce");

// para poder leer los archivos y asi verificar que existen
const fs = require('fs');
// para obtener rutas de archivo
const path = require('path')

//peticiones URL
const Fetch =require ("node-fetch");

//este lo isntale para encontrar en el sistema de archivos
const fileHound=require ('fileHound');
// para poner colores en las lineas de comando
const chalk = require('chalk');
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

 let script_path = process.argv[1];
 console.log("SCRIPT:", script_path);



 const pathToFile = process.argv[2];
//Variables vacias

let links = [];
let totalLinks=0;
let unicoLinks = 0;
let brokenLinks = 0;


//filtrar si es archivo o directorio
//El método fs.lstat () es similar al método fs.stat () excepto que se utiliza para devolver información sobre 
//el enlace simbólico que se utiliza para hacer referencia a un archivo o directorio. El objeto fs.Stat 
//devuelto tiene varios campos y métodos para obtener más detalles sobre el archivo.
const fileOrDirectory = (path) =>{
    return new Promise ((resolve,reject)=>{
        fs.lstats(path,(err,stats) =>{
            if (err){
                reject(err);
            }else if (stats.isDirectory()){
                resolve(goDirectory(path));
            }else{
                resolve(goMdFile(path));
            }
        });
     })
};
fileOrDirectory(path)
.then(res=>{
    console.log("muestrame",res);
})
.catch(err=>{
    console.log(err.code);
})

//El método stats.isDirectory () es una interfaz de programación de aplicaciones incorporada de la 
//clase fs.Stats que se usa para verificar si el objeto fs.Stats describe un directorio del sistema 
//de archivos o no.

const goDirectory =(path)=>{
    return new promise ((resolve, reject)=>{
        fileHound.create()
        .discard("node_modules")
        .paths(path)
        .ext(".md")
        .find()
        .then(res =>(res.forEach(file=>{
            if(file.length !=0){
                console.log("encontramos los sigues archivos md:" + file);
                resolve (readMdFile(file));
            }
        })))
        .catch(err=>{
            reject(new error ("path invalido"));
        })
    })
};

//El método path.extname () se utiliza para obtener la extensión de la ruta de un archivo. La cadena de extensión
// devuelta desde la última aparición de un punto (.) En la ruta hasta el final de la cadena de ruta. 
//Si no hay puntos en la ruta del archivo, se devuelve una cadena vacía.
const goMdFile=file => {
    let extFile=path.extname(file);
    if(extFile===".md"){
        console.log("es un archivo md");
        return readMdFile(file);
    }else{
        console.log("esta no es una extension .md"+"\n");
    }
};

const expreRegu= /(\b(http?|https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

const readMdFile=  fs.readFile(pathToFile,'utf8',(error,data)=>{
  if(error) throw error;
  let dataFile=data;
  //console.log(dataFile);
  let linkData=dataFile.match(expreRegu);
  console.log(linkData)

});
