console.log('Before');
getUser(1,(user)=>{
    console.log(user);

});
console.log('After');

/**
 * Three ways to deal with asynchronous code:
 * 1. Callbacks
 * 2. Promises
 * 3. Async/Await
* */

function getUser(id, callback) {
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        callback({id: id, gitHubUsername : 'tehmoor' });

        },2000);
}