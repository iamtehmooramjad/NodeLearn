/**
 * To create a promise that is already resolved, this is particularly useful for unit tests.
 * To simulate a web service is completed successfully.
 **/
const p = Promise.resolve({id:1});
p.then(res=>console.log(res));


const p2 = Promise.reject(new Error("Reason for rejection"));
p2
    .then(res=>console.log(res))
    .catch(err=>console.log(err));