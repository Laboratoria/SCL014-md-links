let mdlinks = require('./mdlinks');
let fs = require('fs');


//este es el path que te pasa el usuario


const filePathmd = process.argv[2]
//si la ruta es relativa lo pasa a absoluta
const route = (filePathmd) => {

    path.resolve(filePathmd) === path.normalize(filePathmd).replace(RegExp(path.sep + '$'), '');
    console.log(route)
};

//funcion para detectar si es un archivo .md y lo pushea dentro del array 
let mdFileArray = [];
const addPath = (mdPath) => {
    if (mdPath.endsWith('.md')) {
        mdFileArray.push(mdPath)
    }
}
//expresion regular para chequear directorios
let regexForDirectoy = new RegExp('^[a-zA-Zа-яА-Я0-9_!]+$');
const res = filePathmd.match(/[^\\/]+$/)[0];


if (regexForDirectoy.test(res)) {
    filenames = fs.readdirSync(filePathmd, 'utf-8');
    filenames.forEach(file => {
        addPath(filePathmd + '\\' + file)
    });
}
else {
    addPath(filePathmd)
}



let validate = false;
let stats = false;
if (process.argv.includes('--validate')) {
    validate = true;
};
if (process.argv.includes('--stats')) {
    stats = true;
};


console.log("lo que le paso a mdlink es ")
console.log(mdFileArray)
console.log(validate)
console.log(stats)
mdlinks(mdFileArray, validate, stats);








