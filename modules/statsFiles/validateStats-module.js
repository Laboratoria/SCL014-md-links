const printModule = require('../printers/printConsole-module.js');
//Module should get stats from links parsed

module.exports = (objectLinksValidate, option, pathGive) => {

    const arrayObjectLinks = objectLinksValidate;
    // Stringify object 
    const arrayObjectLinkString = new Set(arrayObjectLinks.map(obj => JSON.stringify(obj)));
    // Array Without Duplicate
    const arrayWithoutDuplicate = Array.from(arrayObjectLinkString).map(obj => JSON.parse(obj));

    // Array links Broken
    const arrayBrokenLinks = arrayObjectLinks.filter(object => {
        return object.status === 404;
    });

    const arrayReturn = {
        total: arrayObjectLinks,
        unique: arrayWithoutDuplicate,
        broken: arrayBrokenLinks
    };
    printModule(arrayReturn, option, pathGive);    
};
