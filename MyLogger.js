const EventEmitter  = require("events");

class MyLogger extends EventEmitter{

    log(message){
        console.log(message);

        this.emit('messageLogged',{id:1,url:"https://www.tehmooramjad.com/"});
    }

}

module.exports = MyLogger