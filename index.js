
const mdLinks = require('./md-links.js');
const pathname = process.argv[2];

mdLinks(pathname)
.then(data => console.log(data.href))
.catch(error => console.log(error))