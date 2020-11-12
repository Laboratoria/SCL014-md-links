//Module should get stats from links parsed

module.exports = (objectLinksValidate) => {

    const arrayObjectLinks = objectLinksValidate;
    // Stringify object 
    const arrayObjectLinkString = new Set(arrayObjectLinks.map(JSON.stringify))
    // Array Without Duplicate
    const arrayWithoutDuplicate = Array.from(arrayObjectLinkString).map(JSON.parse);

    console.log('Total: ' + arrayObjectLinks.length);
    console.log('Unique: ' + arrayWithoutDuplicate.length);
};