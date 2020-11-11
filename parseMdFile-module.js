//Module should parse md file read 

module.exports = (error, data, pathFileParse) => {
    // console.log(error);
    // console.log(data);

    // Md file contents
    const mdContents = data.split('\n');
    // Content new array from data
    let arrayMdContent = [];

    const regularExpMdLinks = /\[([^\[]+)\](\(.*\))/gm
    const singleRegExpMatch = /\[([^\[]+)\]\((.*)\)/

    // Aplly Regular expression to data md
    mdContents.forEach(lineData => {
        const arrayLinksMdFile = lineData.match(regularExpMdLinks);

        // console.log(arrayLinksMdFile);
        if (arrayLinksMdFile !== null) {
            arrayLinksMdFile.forEach(element => {
                var text = singleRegExpMatch.exec(element);
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

    console.log(arrayMdContent);
};

// https://davidwells.io/snippets/regex-match-markdown-links