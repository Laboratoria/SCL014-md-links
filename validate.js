const fetch = require('node-fetch');

module.exports = (data) =>
    new Promise((resolve, reject) => {
        let textS = '';
        const validate = data.map((obj) => {
            return fetch(obj.href).then((res, error) => {
                if (error) {
                    reject(error);
                } else {
                    if (res.statusText != 'OK'){
                        
                        textS = 'FAIL';
                    }
                    else {
                        textS = 'OK!'
                    }
                    return {
                        href: res.url,
                        texto: obj.text,
                        file: obj.file,
                        status: res.status,
                        statusText: textS,
                    };
                }
            });
        });

        Promise.all(validate).then((resArr) => {
            resolve(resArr);
        });
    })