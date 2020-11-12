const fetch = require('node-fetch');

module.exports = (data) =>
    new Promise((resolve, reject) => {
        const validate = data.map((obj) => {
            return fetch(obj.href).then((res, error) => {
                if (error) {
                    reject(error);
                } else {
                    return {
                        href: res.url,
                        texto: obj.text,
                        file: obj.file,
                        status: res.status,
                        statusText: res.statusText,
                    };
                }
            });
        });

        Promise.all(validate).then((resArr) => {
            resolve(resArr);
        });
    })