const chalk = require('chalk');
const validate = require('./validate');
const stats = require('./stats');
let chalkStatus, chalkText;

let options = {
    validate: false,
    stats: false,
}

process.argv.forEach((option) => {
    if (option === "--validate" || option === "--v") {
        options.validate = true;
    } else if (option === "--stats" || option === "--s") {
        options.stats = true;
    }
});

module.exports = (data, pathname) => {
    if (options.validate && options.stats === false) {
        return validate(data)
            .then(validatedData => {
                validatedData.forEach(link => {
                    if (link.texto.length > 50) {
                        link.texto = link.texto.slice(0, 50);
                    }
                    if (link.status === 200) { 
                        chalkStatus = chalk.greenBright.bold(link.status);
                        chalkText = chalk.greenBright(link.statusText);
                    } else if (link.status !== 200) {
                        chalkStatus = chalk.white.bold.bgRed(link.status);
                        chalkText = chalk.red(link.statusText);
                    }
                    console.log(pathname,
                        chalk.underline(link.href),
                        link.texto,
                        chalkStatus,
                        chalkText);
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
            if (link.text.length > 50) {
                link.text = link.text.slice(0, 50);
            }
            console.log(pathname, link.href, link.text);
        })
    }
}