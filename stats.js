const { argv } = require('yargs');
const validate = require('./validate');

module.exports = (data) => {
    let uniqueLinks = [];
    let brokenLinks = [];
    let statusOK = 200;
    console.log('Total links:', data.length)

    validate(data)
        .then(validatedData => {
            validatedData.forEach(link => {
                if (!uniqueLinks.includes(link.href)) {
                    return uniqueLinks.push(link.href)
                }
                 if (!link.status != statusOK) {
                    return brokenLinks.push(link.status)
                } 
            })
            console.log('Unique links:', uniqueLinks.length);

            if (argv.validate || argv.v){
            console.log('Broken links:', brokenLinks.length);
            } 
        })
        .catch((err) => {
            console.log(err.code);
        });
}