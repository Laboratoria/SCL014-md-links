module.exports = (arrayResp, option, pathgive) => {
    const arrayObjects = arrayResp
    
    // Print module validate &  stats
    if (option.validate === true && option.stats === true) {
        const countBroken = arrayObjects.total.filter(link => {
            return link.status === 404;
        });
        console.log('YOU HAVE EXECUTED MODULE --VALIDATE --STATS AT ' + arrayObjects.total[0].file);
        console.log('Total: ' + arrayObjects.total.length);
        console.log('Unique: ' + arrayObjects.unique.length);
        console.log('Broken: ' + countBroken.length);
    }
    // Print module validate
    else if (option.validate === true) {
        console.log('YOU HAVE EXECUTED MODULE --VALIDATE AT ' + arrayObjects.total[0].file);
        arrayObjects.total.forEach(link => {
            const truncateString = (sting, num) => {
                if (sting.length <= num) {
                    return sting;
                }
                return sting.slice(0, num);
            }
            const textLength = link.text;

            console.log(link.file + ' ' + link.href + ' ' + link.status + ' ' + link.statusText + ' ' + truncateString(textLength, 50));
        });
    } // Print module stats 
    else if (option.stats === true) {
        console.log('YOU HAVE EXECUTED MODULE --STATS AT ' + arrayObjects.total[0].file);
        console.log('Total: ' + arrayObjects.total.length);
        console.log('Unique: ' + arrayObjects.unique.length);

    } 
};