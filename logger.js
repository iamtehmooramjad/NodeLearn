
var url = "http://mylogger.io/log";

function log(message){
    //Send HTTP request
    console.log(message);
}
// module.exports.log = log  -> exports log object
module.exports = log  // Exports log function

