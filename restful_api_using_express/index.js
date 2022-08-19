const Joi = require('joi');
const express = require('express');
const app = express();

//Enable body parsing of requests
app.use(express.json());

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

    const schema = {
        name : Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body,schema);
    console.log(result);

    if(result.error){
        //Convention to send 400 Bad Request
        res.status(400).send(result.error.details[0].message);
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

    //Validate
    //If invalid, return 400 - Bad request

    //Update course
    //Return the updated course

});






/*
    env variable is in which a process runs : PORT
    set port value of env value using terminal in win set PORT = 5000;
*/

const port = process.env.PORT || 3000;

app.listen(3000,()=>{
    console.log(`Listening on port ${port}`)
});