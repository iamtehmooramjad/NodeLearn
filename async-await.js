/**
 * Async and Await approach : Helps write async code like sync code
 */

async function displayCommits(){
    try{
        const user = await getUserP(1);
        const repos = await getRepositoriesP(user.gitHubUsername);
        const commits = await getCommitsP(repos[0]);
        console.log('Commit',commits);
    }
    catch (err) {
        console.log('Error',err);
    }
}

displayCommits();

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
            // reject(new Error('Could not get repos'));
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
