/**
 * To Debug, npm i debug
 * create functions in that namespace and then use that function  instead of console.log to log messages
 * e.g. SET DEBUG = app:startup or SET debug = app:startup, app:db or SET DEBUG = app:*
 * SET DEBUG =  to log nothing
 * */
const startDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan  = require('morgan');
const logger = require('../middleware/logger');
const authentication = require('../middleware/authentication');
const courses = require('../routes/courses');
const home = require('../routes/home');
const express = require('express');
const app = express();

/**
 *  Templating Engine: To generate dynamic html and return to client.
 *  Most popular templating engines are Pug, Mustache, EJS
 * */

app.set('view engine','pug'); //Express will internally load this module
app.set('views','./views'); // default, but to override path use this




/**
* Middleware:
* It's a function which takes request object and returns response to the client or to another middleware.
* */


/**
*This middleware parses the body of request and if there is a json object, it populates the req. Body and passes the control to route handler middleware,
* Then route handler have request object with body property populated and after performing operations,returns
* the response to the client.
* */
app.use(express.json());

/**
* This middleware parses the incoming request with url encoded payloads
* key=value & key=value
* extended:true = We can pass array or complex objects with urlencoded formats
* */
app.use(express.urlencoded({extended:true}));

/**
 * This middleware accepts a folder name where we place all our static assets like css,images etc.
 */
app.use(express.static('public'));

/**
* Create custom middleware,
* next() is used to pass control to another middleware or router handle to terminate req,res cycle
* */

//Logging
app.use(logger);

//Authenticating
app.use(authentication);

//Routes
app.use('/api/courses',courses);
app.use('/',home);



/**
* Third party middlewares
 * Some Imp third party middlewares: (Goto express.com and check middlewares)
 * 1.Helmet (Help secure your apps with various HTTP headers)
 * 2.Morgan (HTTP request Logger)
* */

/**
 * Two ways to get current env but
 * IF process.env.NODE_ENV is not set it returns undefined but app.get('env') returns development by default
 *
 * To set environment:  $env:NODE_ENV="production"
 *
 *  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
 *  console.log(`app env: ${app.get('env')}`);
 * */


app.use(helmet());

if (app.get('env')==='development'){
    app.use(morgan('tiny'));
   startDebugger('Morgan enabled');
}

dbDebugger('Connected to Database')
/**
 * Configuration
 * */
console.log(`Application Name : ${config.get('name')}`);
console.log(`Mail Server : ${config.get('mail.host')}`);
// console.log(`Mail Server Pass : ${config.get('mail.password')}`);



/**
*    env variable is in which a process runs : PORT
*    set port value of env value using terminal in win set PORT = 5000;
*/

const port = process.env.PORT || 3000;

app.listen(3000,()=>{
    console.log(`Listening on port ${port}`)
});

