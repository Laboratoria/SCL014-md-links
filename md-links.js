const fetch = require('node-fetch');

module.exports = (validateLinks) => {
    const linksValidateWithFetch = validateLinks.map((element) => {
        return fetch(element.links)
         .then ((res) => {
             return { 
             href: res.url,
             text: element.text,
             file: element.file,
             status: res.status,
             statusText: res.statusText,
         }
         });
     });
 
     Promise.all(linksValidateWithFetch)
     .then((arrayResponse) => {
         stats(arrayResponse);
 
     });
   }
  
    

  

