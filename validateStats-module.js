const printModule = require('./printConsole-module.js');
//Module should get stats from links parsed

module.exports = (objectLinksValidate, option) => {

    const arrayObjectLinks = objectLinksValidate;
    // Stringify object 
    const arrayObjectLinkString = new Set(arrayObjectLinks.map(obj => JSON.stringify(obj)));
    // Array Without Duplicate
    const arrayWithoutDuplicate = Array.from(arrayObjectLinkString).map(obj => JSON.parse(obj));

    // Array links Broken
    const arrayBrokenLinks = arrayWithoutDuplicate.filter(object => {
        return object.status === 404;
    });
    /* console.log('Broken tooooo: ' + arrayWithoutDuplicate);
    console.log('Broken teeeee: ' + arrayBrokenLinks);
  */
    const arrayReturn = {
        total: arrayObjectLinks,
        unique: arrayWithoutDuplicate,
        broken: arrayBrokenLinks
    };
    printModule(arrayReturn, option);

};