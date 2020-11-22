module.exports = (linkArray) => {

const {validateLinksAll} = require("./index.js"); 
const {brokenLinksAll} = require("./index.js"); 
const {statsLinks} = require("./index.js"); 

  
    let options = {
      validate: false,
      stats: false,
    };
  
    let validateObject = "";
    if (process.argv.length > 3) {
      process.argv.forEach((element) => {
        if (element === "--validate" || element == "--v") {
          options.validate = true;
        }
        if (element === "--stats" || element == "--s") {
          options.stats = true;
        }
      });
  
      validateObject = process.argv[3];
    }
  
    if (options.validate === true && options.stats === true) {
      //Funcion --validate --stats
      brokenLinksAll(linkArray, options.stats);
    } else if (options.validate === true) {
      //Funcion validate
      validateLinksAll(linkArray, options.stats);
    } else if (options.stats === true) {
      //Funcion stats
      statsLinks(linkArray);
    } else {
      console.log(linkArray);
    }
  }; 
 
