module.exports = (arrayResp, option) => {
    const arrayObjects = arrayResp
    // Print module validate
    if (option === '--validate') {
        arrayObjects.total.forEach(link => {
            console.log(link.file + ' ' + link.href + ' ' + link.status + ' ' + link.statusText + ' ' + link.text);
        });
    } // Print module stats 
    else if (option === '--stats') {
        console.log('MÓDULE  --STATS');
        console.log('Total: ' + arrayObjects.total.length);
        console.log('Unique: ' + arrayObjects.unique.length);

    } // Print module validate &  stats
    else if (option === '--stats --validate' || option === '--validate --stats') {
        const countBroken = arrayObjects.total.filter(link => {
            return link.status === 404;
        });
        console.log('MÓDULE --VALIDATE --STATS');
        console.log('Total: ' + arrayObjects.total.length);
        console.log('Unique: ' + arrayObjects.unique.length);
        console.log('Broken: ' + countBroken.length);
    }
    console.log('Debe ingresar option --validate o --stats');
}