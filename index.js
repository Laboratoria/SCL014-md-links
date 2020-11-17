// Module should get and start mdLinks(path, options)
const { readDirMod } = require('./readDir-module.js');
const pathMmodule = require('./path-module.js');
const readFileFunction = require('./readFileFunction-module.js');

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

// Function should Read file or directory and executed each module
pathMmodule(pathIn).then(resp=>{
    if(resp.typePathFile === true && resp.typePathDir === false){
        readFileFunction(pathIn, argumentOption);
    } else if(resp.typePathDir === true && resp.typePathFile === false){
        readDirMod(pathIn).then(resp=>{
            resp.forEach(fileMd => {             
                readFileFunction(pathIn + fileMd, argumentOption);
            });
        })
    }

});


//PENDIENTES:
// Ver manejo de errores en promesas 
//README del proyecto 
// Se debe ejecuta md-links <path-to-file> [options] === revisar argumentos
//Reconoce rutas absolutas y relativas. 
//Leer un directorio 
//Instalable via CLI
//Crear mi libreria.
//Se puede requerir. 
// hacer test
// truncar  ruta 50 caracteres.


//LISTOS 
// Independizar impresion en consola. OK
//aceptar argumento via consola. OK

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