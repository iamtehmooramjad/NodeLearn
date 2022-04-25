const MyLogger = require('./MyLogger');
const myLogger = new MyLogger();


myLogger.on("messageLogged",(arg)=>{
    console.log(arg);
});

myLogger.log('This is message');
