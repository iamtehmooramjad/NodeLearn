const fs = require('fs');

//All FS methods comes in sync and async. Always try to use async

// var files = fs.readdirSync('./');
// console.log(files);

fs.readdir('./',function(err,files){
    if(err) console.log(err);

    if(files) console.log(files);
})
