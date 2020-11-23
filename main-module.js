#! /usr/bin/env node

// Module should get and start mdLinks(path, options)
const mdLinks = require('./index.js');

// Content path file or directory to parse
const pathIn = process.argv[2];

// Content option selected
const optionIn = () => {
    return {
        stats: process.argv.includes('--stats'),
        validate: process.argv.includes('--validate')
    };
};
const argument = optionIn();

mdLinks(pathIn, argument).then(resp=>console.log(resp))
    .catch(() => console.log('Ha ocurrido un error'));
