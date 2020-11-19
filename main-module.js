// Module should get and start mdLinks(path, options)
const pathModule = require('./modules/path-module.js');
const printArrayLinks = require('./modules/printers/printArrayLinks.js');
const checkIfItIsFileOrDirectory = require('./modules/checkIfItIsFileOrDirectory.js');

// Content path file or directory to parse
const pathIn = process.argv[2];
//console.log(pathIn);

// Content option selected
//const optionIn = process.argv[3];
const optionIn = () => {
    return {
        stats: process.argv.includes('--stats'),
        validate: process.argv.includes('--validate')
    };
};
const argument = optionIn();


// Function should Read file or directory and executed each module
pathModule(pathIn)
    .then((resp) => checkIfItIsFileOrDirectory(resp, pathIn))
    .then((arrayLinks) => printArrayLinks(arrayLinks, argument, pathIn))
    .catch(error => console.log('Error:  ' + error));







//PENDIENTES:
//Reconoce rutas absolutas y relativas. 
//README del proyecto 

// hacer test
// Ver manejo de errores en promesas 
// Se debe ejecuta md-links <path-to-file> [options] === revisar argumentos
//Instalable via CLI
//Crear mi libreria.
//Se puede requerir. 



//LISTOS 
// truncar  ruta 50 caracteres. OK
// Independizar impresion en consola. OK
//aceptar argumento via consola. OK
//Leer un directorio . OK

// TEST
// Simular que no recibe argumentos 
// simular que recibe otro tipo de argumento 
// simular que la ruta no existe 


// CONSIDERAR
// si no recibe argumentos 
// si  el archivo md  ingresado no se encuentra 
// si el argumento en la posicion[2] no es una url 
// si el arqumento en la posicion[3] no es validate ni stats
// si la ruta es un directorio 

//https://medium.com/@muzk/c%C3%B3mo-crear-un-m%C3%B3dulo-en-npm-11ff8c1c699f