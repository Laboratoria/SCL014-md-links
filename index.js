#!/usr/bin/env node

const mdLinks = require('./md-links.js');
const pathname = process.argv[2];

mdLinks(pathname, (isAbsolute, route) => {
    console.log(isAbsolute, route);
});
