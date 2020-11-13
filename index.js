// Module should get and start mdLinks(path, options)
const { readFileMod } = require('./readFile-module');
const parseMdFile = require('./parseMdFile-module.js');
const validateModule = require('./validate-module.js');
const statsModule = require('./stats-module');


// Content path file or directory to parse
const pathIn = process.argv[2];

// Content option selected
const optionIn = process.argv[3];

// Fuction Read file 
readFileMod(pathIn)
    .then(dataObject => {
        return parseMdFile(dataObject, pathIn);
    })
    .then(arrayLinks => {
    if (optionIn === '--validate') {
        validateModule(arrayLinks);
    } else if (optionIn === '--stats') {
        statsModule(arrayLinks);
    }
        console.log('hola');
    })
    ;









// CONSIDERAR
// si no recibe argumentos 
// si  el archivo md  ingresado no se encuentra 
// si el argumento en la posicion[2] no es una url 
// si el arqumento en la posicion[3] no es validate ni stats
// si la ruta es un directorio 

//https://medium.com/@muzk/c%C3%B3mo-crear-un-m%C3%B3dulo-en-npm-11ff8c1c699f