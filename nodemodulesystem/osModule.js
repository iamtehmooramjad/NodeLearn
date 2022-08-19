const os = require('os')

const totalMemory = os.totalmem;
const freeMemory = os.freemem;
const info = os.userInfo()

console.log(`Total memory ${totalMemory}`);
console.log(`Free memory ${freeMemory}`);
console.log(`User Info ${info.username}`);
console.log(`User Info ${info.uid}`);
console.log(`User Info ${info.gid}`);
console.log(`User Info ${info.homedir}`);
console.log(`User Info ${info.shell}`);