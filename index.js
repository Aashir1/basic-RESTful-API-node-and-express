const express = require("express");
const bodyParser = require('body-parser');
const Joi = require('joi');
const app = express();
const port = process.env.PORT || 3000; //if (environmentVariable)  process.env.PORT else 3000
let courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
] 

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('Hello World');
});

// app.get('/api/course', (req, res)=>{
//     res.send(JSON.stringify([1, 2, 3]));
// });

//adding course

app.post('/api/course', (req, res) =>{
    
    const {error} = validation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//retrive data by id courses

app.get('/api/course/:id', (req, res)=>{
    console.log(courses);
    console.log(req.params.id);
    let course = courses.find(c => c.id === parseInt(req.params.id));
    //404 object not found
    if(!course) return res.status(404).send('Given id is not found');
    res.send(course);
});

//retrive all data

app.get('/api/course', (req, res)=>{
    //404 object not found
    if(!courses) return res.status(404).send(' not found');
    res.send(courses);
});

//update course

app.put('/api/course/:id', (req, res)=>{
    let course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('your provided ID not found');

    const {error} = validation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});


//delete course 

app.delete('/api/course/:id', (req, res)=>{
    let course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('your provided ID not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});



//validation function

function validation(obj){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(obj, schema);
}


console.log(courses);
app.listen(port, ()=>{
    console.log(`server running on ${port}`);
});