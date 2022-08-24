/**
 * Promises: Holds the eventual result of an asynchronous operation,When async operation completes,it can either
 * result in a value or an error.
 * A Promise basically promises you that it will give you the result of an async operation.
 *  This object will be in one of the 3 stages:
 *   1. Pending (When the promise will kick off some async operation)
 *   2. Fulfilled (Means the operation is completed successfully, it will return some value)
 *   3. Rejected (If something went wrong, it will be return some error)
 * */

const p = new Promise( (resolve, reject) => {
    //Async work
    // resolve(1);  // To send this value to the consumer of this promise
    // reject(new Error('message'));

    setTimeout(()=>{
        // resolve(1);
        reject(new Error('message'));
    },2000);

});


    p
    .then(result=>console.log('Result ',result))
    .catch(err=> console.log('Error',err.message));


/**
 * Chaining Multiple  Promises */

getUserP(1)
    .then( (result) => getRepositoriesP(result.gitHubUsername) )
    .then( (repos) => getCommitsP(repos[0]))
    .then( (commits) => console.log('Commits',commits))
    .catch(err=>console.log('Error',err.message));

function getUserP(id) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Reading user from database...');
            resolve({id:id, gitHubUsername: 'iamtehmooramjad'})
        },2000);
    });
}

function getRepositoriesP(username){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(`Getting User Repositories of ${username}...`);
            resolve(['repo1','repo2','repo3']);
        },2000);

    });
}


function getCommitsP(repo){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(`Getting Repo ${repo} Commits ...`);
            resolve(['commit1','commit2','commit3']);
        },2000);

    });
}
