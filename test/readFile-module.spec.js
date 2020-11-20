const { readFileMod } = require('../modules/readersFiles/readFile-module.js');
const fs = require('fs');
jest.mock('fs');


describe('test readFile', () => {

    it('test readFile function with data', () => {
        //Arrange
        const path = 'fake.md';
        fs.readFile = jest.fn((path, type, callback) => {
            callback(null, 'Fake file');
        });
        //Act
        return readFileMod(path).then(resp => {
            console.log(resp);
            //Assert
            expect(resp !== null).toBe(true);
        });

    });

    it('test readFile function with error', () => {
        //Arrange
        const path = 'fake.md';
        fs.readFile = jest.fn((path, type, callback) => {
            callback('error', null);
        });
        //Act
        return readFileMod(path).catch(error => {
            console.log(error);
            //Assert
            expect(error !== null).toBe(true);
        });

    });
});
