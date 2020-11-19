const { argv } = require('yargs');
const chalk = require('chalk');
const validate = require('./validate');

module.exports = (data) => {
    let uniqueLinks = [];
    let brokenLinks = 0;
    let statusOK = 200;
    console.log('Total links:', data.length)

    validate(data)
        .then(validatedData => {
            validatedData.forEach(link => {
                 if (link.status !== statusOK) {
                    return brokenLinks++;
                }
                if (!uniqueLinks.includes(link.href)) {
                    return uniqueLinks.push(link.href);
                }  
            })
            console.log('Unique links:', uniqueLinks.length);

            if (argv.validate || argv.v){
            console.log(chalk.red('Broken links:', brokenLinks));
            } 
        })
        .catch((err) => {
            console.log(err.code);
        });
}