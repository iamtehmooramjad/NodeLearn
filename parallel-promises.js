/**
 * Running few async operations parallel and when they are complete and result is ready,
 * perform another operation or return result to the client  */

const p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('Async operation 1...');
        resolve(1);
        // reject(new Error('An error occurred'));
    },2000);
});

/** Exclude reject if not used */

const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Async operation 2...');
        resolve(2);
    },2000);
});

/** If any promise failed then the result will be error */
Promise.all([p1,p2])
    .then(res => {console.log(res)})
    .catch(err=>console.log(err));


/**
 * Sometimes we kick off multiple async operations, but we want to do something as soon as the first operation
 * completes.
 * Below promise when resolved will return the value of that promise
 * */

Promise.race([p1,p2])
    .then(res => {console.log(res)})
    .catch(err=>console.log(err));
