#!/usr/bin/env node

const fs = require('fs');

const process= require('process');

const fetch = require('fetch');
const fetchUrl=fetch.fetchUrl;
const path = require('path');

const chalk = require("chalk");
const { rejects } = require('assert');

const args = process.argv; 
//const [,, ...args] = process.argv;
console.log(`${args}`);

console.log("number of arguments is "+args.length); 
  
args.forEach((val, index) => { 
   console.log(`${index}: ${val}`); 
 }); 




//al ponerle la direccion en consola, este CLG me esta arrojando la direccion con el parametro args
// console.log(path('/foo/bar', './baz'));
//console.log(`${args}`);



console.log("hola mundo node")

//Definir si es carpeta o archivo

// const verifyArchFille = (files,arr)=>{
//   arr= arr||[];

//   fs.readdir(files,(err, data) =>{
//     data.forEach(files =>{
//       fs.stat(files,(err, stats) =>{
//         if (err) {
//           throw("Error"); 
//         }else{
//           if(stats.isDirectory()){
//             console.log(files + "es carpeta");
//           }else if(stats.isFile()){
//             console.log(files + "es archivo");
//           }
//         }
//       });
//     });

//   });

// }
// verifyArchFille(path);

// //comprobar si existe un archivo o directorio /asincrono

// fs.stat( pathToFile, function(err) {
//   if (!err) {
//       console.log('file or directory exists');
//   }
//   else if (err.code === 'ENOENT') {
//       console.log('file or directory does not exist');
//   }
// });
// leer archivo de forma sincrona

// fs.readFile(path(args[0]), 'utf-8', (err, data) => {
//   if(err) {
//      console.log('error: ', err);
//    } else {
//      console.log(data);
//   }
//   });

//   fs.readdirSync(path(args[0]), 'utf-8', (err, data) => {
//     if(err) {
//       console.log('error: ', err);
//     } else {
//       console.log(data);
//     }
//   });
//   // let archivo = fs.readFileSync('archivo2.txt', 'utf-8');
//   console.log(archivo);


// //----------------------- Función que permite convertir una ruta a Absoluta -------------------
// const convertAbsolute = (route) => {
//   return path.resolve(route);
  
// }

// //--------------------- Función que permite verificar estado de la routa ----------------------
// const verificationRoute = (routeAbsolute) => {
// 	return fs.statSync(routeAbsolute);
// }

// //-------------------- Función que verifica que existe archivo ------------------------------
// const fileExists = (files) => {
// 	if (fs.existsSync(files)) {
// 		return exist = true;
// 	}
// };

// //--------------------- Función que permite leer archivo -------------------------------
// const readFile = (route) => {
// 	const pathAbsolute = convertAbsolute(route);
// 	const statsFile = verificationRoute(pathAbsolute);
// 	if (statsFile.isFile()) {
// 		const exist = fileExists(pathAbsolute);
// 		if (exist) {
// 			recorredFile(pathAbsolute, route);
// 		}
// 	} else if (statsFile.isDirectory()) {
// 		const files = verificationDir(pathAbsolute);

// 		files.map((file) => {
// 			readFile(route + '/' + file);
// 		});
// 	}
// };


//para obtener rutas de archivos
const pathToFile = process.argv[2];
console.log("console.log"+pathToFile)






console.log(chalk.bold.inverse.white("\n" +
  " ---------------------------------------- MD-LINKS RESULT ---------------------------------------- "));

console.log(chalk.bold("FILE NAME: ") + chalk(pathToFile));
//transforma ruta absoluta en relativa// debe ir en esta posicion para que despues muestre la ruta absoluta
//path.resolve y path.normalize

const convAbsolute= path.resolve(pathToFile);
const convNormalize= path.normalize(convAbsolute);
console.log(convNormalize)
console.log(chalk.bold("FILE PATH: ") + chalk.white(convNormalize) + "\n");
//console.log("PATH:", pathToFile);

//comprobar si existe un archivo o directorio asincrono revisaremos el estado de la ruta archivo o directorio fs.statSync
const statsObj =fs.statSync(convNormalize, function(err) {
  if (!err) {
      console.log('file or directory exists');
      
  }
  else if (err.code === 'ENOENT') {
      console.log('file or directory does not exist');
  }
});

      console.log("Path is file:", statsObj.isFile(convNormalize)); 
      console.log("Path is directory:", statsObj.isDirectory(convNormalize)); 

  
// revisaremos si archivo existe con fs.existsSync

const fileExists = fs.existsSync(convNormalize); 
console.log("file exists:", fileExists);

//leeremos file --------------------


// const contenido= fs.readFileSync ( pathToFile,'utf8', function(error,datos) {

//   //  console.log(datos);
// })
// console.log("El detalle es:" + contenido);

const expreRegu= /(\b(http?|https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

const readF=  fs.readFile(pathToFile,'utf8',(error,data)=>{
  if(error) throw error;
  let dataFile=data;
  //console.log(dataFile);
  let linkData=dataFile.match(expreRegu);
  console.log(linkData)

});



const getHttpStatus =(url)=>{

  return new Promise ((resolve,reject)=>{
    fetchUrl(url,(error,meta,body)=>{
      if(meta){
        resolve(meta.status);
      }else{
        reject (error);
      }

    })

  })

}

let url="https://www.google.com"
getHttpStatus(url)
.then (res=>{
  console.log("el estado de " ,url,"es:", res);
})
.catch(err=>{
  console.log(err.code)
});


// const readFile = (route) => {
	
// 	const statsFile = statsObj(convNormalize);
// 	if (statsFile.isFile()) {
// 		const exist = fileExists(convNormalize);
// 		if (exist) {
// 			recorredFile(convNormalize, route);
// 		}
// 	} else if (statsFile.isDirectory()) {
// 		const files = verificationDir(convNormalize);

// 		files.map((file) => {
// 			readFile(route + '/' + file);
// 		});
// 	}
// };

// console.log(readFile);

