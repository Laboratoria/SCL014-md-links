// Modulo debe recibir y  Ejecutar mdLinks(path, options)
const { readFileMod } = require('./readFile-module');

const pathIn = process.argv[2];
const optionIn = process.argv[3];

readFileMod(pathIn);

/* module.exports = () => {

}; */



// CONSIDERAR
// si el argumento en la posicion[2] no es una url 
// si el arqumento en la posicion[3] no es validate ni stats
// si la ruta es un directorio 


