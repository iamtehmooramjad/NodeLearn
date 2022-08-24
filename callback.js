console.log('Before');
getUser(1,(user)=>{
    console.log(user);
    getRepositories(user.gitHubUsername,(repos)=>{
        console.log(repos);

    });
});
console.log('After');

/**
 * Three ways to deal with asynchronous code:
 * 1. Callbacks (Callback Hell because of nexted structure)
 * 2. Promises
 * 3. Async/Await
* */

/**
 * To flatten nesting Structure, we can use named functions instead of anonymous functions
 * */

function getUser(id, callback) {
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        callback({id: id, gitHubUsername : 'iamtehmooramjad' });

        },2000);
}

function getRepositories(username,callback) {
    setTimeout(()=>{
        console.log(`Reading ${username} repositories from database...`);
        callback(['repo1','repo2','repo3']);
    },2000);

}

