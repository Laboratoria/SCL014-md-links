const parseMdFile = require('../modules/parseFiles/parseMdFile-module.js');

describe('test parseMdFile', () => {

    it('test parseMdFile function', () => {
        //Arrange
        const mdFile = `[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
        ligero muy popular entre developers. Es usado en muchísimas plataformas que
        manejan texto plano (GitHub, foros, blogs, ...), y es muy común
        encontrar varios archivos en ese formato en cualquier tipo de repositorio
        (empezando por el tradicional).
        [Node.js](http://nodejs.org/), que lea y analice archivo`;
        const path = './mdTest.md';
        //Act
        const arrayLinks = parseMdFile(mdFile, path);
        //Assert
        expect(arrayLinks[0]).toStrictEqual({ href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: './mdTest.md' });
        expect(arrayLinks[1]).toStrictEqual({ href: 'http://nodejs.org/', text: 'Node.js', file: './mdTest.md' });
    });

});
