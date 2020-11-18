// Module should get and start mdLinks(path, options)
const pathModule = require('./path-module.js');
const printArrayLinks = require('./printArrayLinks.js');
const checkIfItIsFileOrDirectory = require('./checkIfItIsFileOrDirectory.js');


// Content path file or directory to parse
const pathIn = process.argv[2];
//console.log(pathIn);

// Content option selected
//const optionIn = process.argv[3];
const optionIn = () => {
    if (process.argv.length === 4) {
        return { arg: process.argv[3] };
    } else if (process.argv.length > 4) {
        const argument = process.argv.slice(3, 5);
        const newArgument = argument[0] + ' ' + argument[1];
        return { arg: newArgument };
    }
};
const argument = optionIn();
const argumentOption = argument.arg;

// Function should Read file or directory and executed each module
pathModule(pathIn)
    .then((resp) => checkIfItIsFileOrDirectory(resp, pathIn, argumentOption))
    .then((arrayLinks) => printArrayLinks(arrayLinks, argumentOption, pathIn))
    .catch(error => console.log('Error:  ' + error));

//PENDIENTES:
//Reconoce rutas absolutas y relativas. 
// hacer test
// Ver manejo de errores en promesas 
//README del proyecto 
// Se debe ejecuta md-links <path-to-file> [options] === revisar argumentos
//Instalable via CLI
//Crear mi libreria.
//Se puede requerir. 
// truncar  ruta 50 caracteres.


//LISTOS 
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