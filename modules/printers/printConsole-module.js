module.exports = (arrayResp, option, pathgive) => {
    const arrayObjects = arrayResp
    // Print module validate
    if (option === '--validate') {
        console.log('YOU HAVE EXECUTED MODULE --VALIDATE AT '+ arrayObjects.total[0].file);
        arrayObjects.total.forEach(link => {
            console.log(link.file + ' ' + link.href + ' ' + link.status + ' ' + link.statusText + ' ' + link.text);
        });
    } // Print module stats 
    else if (option === '--stats') {
        console.log('YOU HAVE EXECUTED MODULE --STATS AT '+ arrayObjects.total[0].file);
        console.log('Total: ' + arrayObjects.total.length);
        console.log('Unique: ' + arrayObjects.unique.length);

    } // Print module validate &  stats
    else if (option === '--stats --validate' || option === '--validate --stats') {
        const countBroken = arrayObjects.total.filter(link => {
            return link.status === 404;
        });
        console.log('YOU HAVE EXECUTED MODULE --VALIDATE --STATS AT '+ arrayObjects.total[0].file);
        console.log('Total: ' + arrayObjects.total.length);
        console.log('Unique: ' + arrayObjects.unique.length);
        console.log('Broken: ' + countBroken.length);
    }
   
};