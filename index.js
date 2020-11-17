// Module should get and start mdLinks(path, options)
const { readFileMod } = require('./readFile-module');
const parseMdFile = require('./parseMdFile-module.js');
const validateModule = require('./validate-module.js');
const statsModule = require('./stats-module.js');
const validateStatsModule = require('./validateStats-module.js');
const printModule = require('./printConsole-module.js');

// Content path file or directory to parse
const pathIn = process.argv[2];

// Content option selected
//const optionIn = process.argv[3];
const optionIn = () => {
    if (process.argv.length === 4) {
        return { arg: process.argv[3]};
    } else if (process.argv.length > 4) {
        const argument = process.argv.slice(3, 5);
        const newArgument = argument[0] + ' ' + argument[1];
        return { arg:newArgument};
    }
};
const argument = optionIn();
const argumentOption =argument.arg;

// Fuction Read file 
readFileMod(pathIn)
    .then(dataObject => {
        return parseMdFile(dataObject, pathIn);
    })
    .then(arrayLinks => {
        if (argumentOption === '--validate') {
            validateModule(arrayLinks, argumentOption);
        }  //return validateModule(arrayLinks)
        else if (argumentOption === '--stats') {
            statsModule(arrayLinks, argumentOption);
        }else if (argumentOption === '--stats --validate' || argumentOption === '--validate --stats') {
            validateStatsModule(arrayLinks, argumentOption);
        }
        console.log('hola');
    })
    ;

//PENDIENTES:
// Independizar impresion en consola.
//Reconoce rutas absolutas y relativas. 
//Leer un directorio 
//aceptar argumento via consola
//Instalable via CLI
//Crear mi libreria.
//Se puede requerir. 
// hacer test
// truncar  ruta 50 caracteres.

// CONSIDERAR
// si no recibe argumentos 
// si  el archivo md  ingresado no se encuentra 
// si el argumento en la posicion[2] no es una url 
// si el arqumento en la posicion[3] no es validate ni stats
// si la ruta es un directorio 

//https://medium.com/@muzk/c%C3%B3mo-crear-un-m%C3%B3dulo-en-npm-11ff8c1c699f