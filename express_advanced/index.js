const config = require('config');
const helmet = require('helmet');
const morgan  = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const authentication = require('./authentication');
const express = require('express');
const Console = require("console");
const app = express();

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
    console.log('Morgan enabled');
}


/**
 * Configuration
 * */
console.log(`Application Name : ${config.get('name')}`);
console.log(`Mail Server : ${config.get('mail.host')}`);
// console.log(`Mail Server Pass : ${config.get('mail.password')}`);


const courses = [
    { id: 1, name: "PF"},
    { id: 2, name: "OOP"},
    { id: 3, name: "DSA"}
];

//Get
app.get('/',(req, res)=>{
    res.send(`Hello World`);
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

//We use route parameters for essential values and queryString parameters for optional values
app.get('/api/courses/:id',(req, res)=>{
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if (course){
        res.send(course);
    }
    else{
        //Convention to send 404 if resource not found
        res.status(404).send('Course not found');
    }
})


app.get('/api/posts/:month/:year',(req, res)=>{
    res.send(req.params);
})


//POST
//In order to parse body of the request, we have to enable parsing of json object (app.use(express,json())

//For validations npm install joi
app.post('/api/courses',(req, res)=>{

    const {error} =validateCourse(req.body);
    if(error){
        //Convention to send 400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }


    const course = {
        id : courses.length+1,
        name : req.body.name
    };
    courses.push(course);

    //Convention to send the newly created resource on server when created
    res.send(course);
});


//PUT
app.put('/api/courses/:id',(req, res)=>{
    //Look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if (!course){
        //Convention to send 404 if resource not found
        res.status(404).send('Course not found');
        return;
    }

    //Validate
    //If invalid, return 400 - Bad request
    const { error } =validateCourse(req.body);

    if(error){
        //Convention to send 400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }


    //Update course
    //Return the updated course
    course.name = req.body.name
    res.send(course);


});


//DELETE
app.delete('/api/courses/:id',(req, res)=>{
    //Look up the course
    //Not existing, return 404
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if (!course){
        //Convention to send 404 if resource not found
        res.status(404).send('Course not found');
        return;
    }

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //Return the same course
    res.send(course);
});


function validateCourse(course) {
    const schema = {
        name : Joi.string().min(3).required()
    };
    return   Joi.validate(course,schema);
}




/**
*    env variable is in which a process runs : PORT
*    set port value of env value using terminal in win set PORT = 5000;
*/

const port = process.env.PORT || 3000;

app.listen(3000,()=>{
    console.log(`Listening on port ${port}`)
});


