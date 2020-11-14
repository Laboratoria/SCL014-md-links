let mdlinks = require('./mdlinks');
let fs = require('fs');


//este es el path que te pasa el usuario
const filePathmd = process.argv[2]
console.log(filePathmd)
let mdFileArray = [];

//funcion para detectar si es un archivo .md y lo pushea dentro del array 
function addPath(mdPath) {
    if (mdPath.endsWith('.md')) {
        console.log("es un archivo md")
        mdFileArray.push(mdPath)
    }
}
//expresion regular para chequear directorios
let regexForDirectoy = new RegExp('^[a-zA-Zа-яА-Я0-9_!]+$');
const res = filePathmd.match(/[^\\/]+$/)[0];
console.log("---------------------")
console.log(res)
console.log("---------------------")
console.log(regexForDirectoy.test(res));


if (regexForDirectoy.test(res)) {
    console.log("es un directorio")
    console.log("\nCurrent directory filenames:");
    filenames = fs.readdirSync(filePathmd, 'utf-8');
    filenames.forEach(file => {
        console.log(file);
        addPath(filePathmd + '\\' + file)
    });
}
else {
    addPath(filePathmd)
}

//devuelve los archivos dentro del directorio que sean md
console.log("los path logeados para procesar son:")
console.log(mdFileArray)

if (process.argv.includes('--validate')) {
    console.log('se solicita validate');
};
if (process.argv.includes('--stats')) {
    console.log('se solicita stats');
};

mdlinks(mdFileArray);






