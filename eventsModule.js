const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('messageLogged',(e)=>{
    console.log('Message Logged',e);
})

emitter.on('logging',(arg)=>{
    console.log('Message Logged',arg)
});

emitter.emit('logging',{message:"This is message"});
emitter.emit('messageLogged',{id:1,url:'http://'});
