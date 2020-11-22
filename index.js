#!/usr/bin/env node
const mdLinks = require("./md-links.js");
//para obtener rutas de archivos
const path = require("path");
//pone colores en linea de comando
const chalk = require("chalk");

let pathToFile = process.argv[2];

//console.log(chalk.bold.inverse("FILE: ") + chalk.bold.inverse(pathToFile));
console.log(chalk.bold.inverse.yellow("\n" +
  " ---------------------------------------- MD-LINKS  ---------------------------------------- ")+ "\n" );
console.log(chalk.bold.yellow("Escoge una opción: ") + chalk.white("No options | --validate or --v | --stats or --s  | --validate --stats or --v --s") + "\n");

console.log(chalk.bold.yellow("FILE NAME: ") + chalk(pathToFile));

//transforma ruta absoluta en relativa
pathToFile = path.resolve(pathToFile);
pathToFile = path.normalize(pathToFile);
console.log(chalk.bold.yellow("FILE PATH: ") + chalk.white(pathToFile) + "\n");
//console.log("PATH:", pathToFile);

let firstOption = process.argv[3];
let secondOption = process.argv[4];

//Let con las opciones para md-links
let options = {
  validate: false,
  stats: false
};
if (
  (firstOption === "--validate" && secondOption === "--stats") ||
  (firstOption === "--v" && secondOption === "--s") ||
  (firstOption === "--stats" && secondOption === "--validate") ||
  (firstOption === "--s" && secondOption === "--v")
) {
  options.validate = true;
  options.stats = true;
} else if (firstOption === "--validate" || firstOption === "--v") {
  options.validate = true;
  options.stats = false;
} else if (firstOption === "--stats" || firstOption === "--s") {
  options.validate = false;
  options.stats = true;
} else {
  options.validate = false;
  options.stats = false;
}

mdLinks(pathToFile, options)
.then(links => {
    if (options.validate === false && options.stats === false) {
      links.map(link => {
        console.log(
            //este esta funcionando/////////////
            chalk.bold.inverse.yellow("FILE:") +
          chalk.white(link.file) +
          " " +
          "\n" +
          chalk.bold.inverse.bgBlack("LINK:") +
          chalk.bold.blue("[" + link.text.substr(0, 50) + "]") +
          " " +
          // chalk.inverse.blue("HREF:") +
          chalk.underline.blue(link.href)
        );
      });
    } else if (options.validate === true && options.stats === true) {
        //este etsa funcionando
        console.log("\n" +
        chalk.bold.inverse.yellow(" TOTAL LINKS: " + links.total + " ") +
        " " +
        chalk.bold.inverse.blue(" UNIQUE LINKS:" + links.unique + " ") +
        " " +
        //este ok links no esta bien
       // chalk.bold.inverse.green(" OK LINKS: " + links.ok + " ") +
       // " " +
        chalk.bold.inverse.red(" BROKEN LINKS: " + links.broken + " ") + "\n"
      );
    } else if (options.validate === true && options.stats === false) {
      links.map(link => {
        if (link.response === "O.K.") {
            console.log(
                chalk.bold.inverse("FILE:") +
                " " +
                chalk.white(link.file) +
                " " +
                "\n" +
                chalk.bold.bgGreen(" STATUS:" + " " + link.status + " " + link.response + " ") +
                " " +
                chalk.bold.green("LINK:") +
                " " +
                chalk.bold.green("[" + link.text.substr(0, 50) + "]") +
                " " +
                chalk.underline.green(link.href)
              );
        } else if (link.response === "FAIL") {
            console.log(
                chalk.bold.inverse("FILE:") +
                " " +
                chalk.white(link.file) +
                " " +
                "\n" +
                chalk.bold.bgRed(" STATUS:" + " " + link.status + " " + link.response + " ") +
                " " +
                chalk.bold.red("LINK:") +
                " " +
                chalk.bold.red("[" + link.text.substr(0, 50) + "]") +
                " " +
                chalk.underline.red(link.href)
              );
        }
      });
    } else if (options.validate === false && options.stats === true) {
        //esta esta funcionando/////////////////////
        console.log(
            chalk.bold.inverse.yellow("TOTAL LINKS:") +
            chalk.bold.inverse.bgBlack(links.total) +
            " " +
            chalk.bold.inverse.blue("UNIQUE LINKS:") +
            chalk.bold.inverse.bgBlack(links.unique) + "\n"
          );
    }
  })
  .catch(err => {
    
    
    console.log(chalk.bold.red("Encontramos un error: la ruta o el archivo no es válido. Inténtalo de nuevo." + "\n"));
  });