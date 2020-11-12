// Module should get and start mdLinks(path, options)
const { readFileMod } = require('./readFile-module');

// Content path file or directory to parse
const pathIn = process.argv[2];

// Content option selected
const optionIn = process.argv[3];

// Fuction Read file 
readFileMod(pathIn);

// CONSIDERAR
// si no recibe argumentos 
// si  el archivo md  ingresado no se encuentra 
// si el argumento en la posicion[2] no es una url 
// si el arqumento en la posicion[3] no es validate ni stats
// si la ruta es un directorio 


