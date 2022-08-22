const Joi = require("joi");
const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: "PF"},
    { id: 2, name: "OOP"},
    { id: 3, name: "DSA"}
];



router.get('/',(req,res)=>{
    res.send(courses);
})

//We use route parameters for essential values and queryString parameters for optional values
router.get('/:id',(req, res)=>{
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if (course){
        res.send(course);
    }
    else{
        //Convention to send 404 if resource not found
        res.status(404).send('Course not found');
    }
})


/*
router.get('/api/posts/:month/:year',(req, res)=>{
    res.send(req.params);
})
*/


//POST
//In order to parse body of the request, we have to enable parsing of json object (app.use(express,json())

//For validations npm install joi
router.post('/',(req, res)=>{

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
router.put('/:id',(req, res)=>{
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
router.delete('/:id',(req, res)=>{
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

module.exports = router