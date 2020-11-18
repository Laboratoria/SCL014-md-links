
const validate = require('./validate');
const stats = require('./stats');

let options = {
    validate: false,
    stats: false,
  }

  process.argv.forEach((option) => {
    if(option === "--validate" || option === "--v") {
      options.validate = true;
    } else if(option === "--stats" || option === "--s") {
      options.stats = true;
    }
  }); 

  module.exports = (data, pathname) => {
    if (options.validate && options.stats === false) {
        return validate(data)
          .then(validatedData => {
            validatedData.forEach(link => {
              console.log(pathname, link.href, link.texto, link.status, link.statusText);
            })
          })
          .catch(error => console.log(error))
      }
      if (options.validate === false && options.stats) {
        stats(data)
      }
      if (options.validate && options.stats) {
        stats(data)
      }
      if (process.argv[3] === undefined) {
        data.forEach(link => {
          console.log(pathname, link.href, link.text);
        })
      }
  }