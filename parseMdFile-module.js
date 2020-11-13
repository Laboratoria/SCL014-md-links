const validateModule = require('./validate-module.js');
const statsModule = require('./stats-module.js');

//Module should parse md file read 
module.exports = (data, pathFileParse) => {
    // console.log(error);
    // console.log(data);

    // Md file contents
    const mdContents = data.split('\n');
    // Content new array from data
    let arrayMdContent = [];

    const regularExpMdLinks = /\[([^\[\]]*?)\]\((\S*?)\)/gsi
    const singleRegExpMatch = /\[([^\[]+)\]\((.*)\)/

    // Aplly Regular expression to data md
    mdContents.forEach(lineData => {
        const arrayLinksMdFile = lineData.match(regularExpMdLinks);

        // console.log(arrayLinksMdFile);
        if (arrayLinksMdFile !== null) {
            arrayLinksMdFile.forEach(element => {
                // Aplly Regular expression every part
                var text = singleRegExpMatch.exec(element);
                // Get URL with protocol  http and https and push new objects array
                if (text[2].includes('http://') || text[2].includes('https://')) {
                    arrayMdContent.push({
                        href: text[2],
                        text: text[1],
                        file: pathFileParse
                    })
                }

            });

        }

    });
    return arrayMdContent;
    /* validateModule(arrayMdContent);
    statsModule(arrayMdContent); */
};
