const fs = require('fs');
const pathIngresada = process.argv[2];
path = "/Users/divyarani/Documents/geekforgeeks/geeks.js"
  
// Use stat() method 
fs.stat(pathIngresada, (err, stats) => { 
  if( !err ){ 
       if(stats.isFile()){ 
           console.log('is file ? ' + stats.isFile()); 
       } 
  
       else if(stats.isDirectory()){ 
           console.log('is directory? ' + stats.isDirectory()); 
       } 
   } 
   else
      throw err;  
}); 

/* module.exports = ()=>{
    const fs = require('fs');
    const pathIngresada = process.argv[2];
    const path = "/Users/divyarani/Documents/geekforgeeks/geeks.js"
      
    // Use stat() method 
    fs.stat(pathIngresada, (err, stats) => { 
      if( !err ){ 
           if(stats.isFile()){ 
               console.log('is file ? ' + stats.isFile()); 
           } 
      
           else if(stats.isDirectory()){ 
               console.log('is directory? ' + stats.isDirectory()); 
           } 
       } 
       else
          throw err;  
    }); 
}; */