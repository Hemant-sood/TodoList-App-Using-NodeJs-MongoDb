const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const taskSchema = require('./Model/taskModel');
const path = require('path');
const url = "mongodb://localhost:27017/fortaskToDoList";

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: true }));

const connect = mongoose.connect(url);



//For Get request in index.js
app.get('/', (req, res) => {

    res.sendFile('./home.html', { root: __dirname });
});


app.post('/form-submit', async function(req, res) {

    //To add the current data into database
    const db = await connect;
    var newTask = taskSchema({
        Task: req.body.task
    });
    await newTask.save();

    //To show the data into page 'showTask.ejs
    taskSchema.find({}, function(err, val) {
        console.log(res.length);
        res.render('showTask.ejs', { todoTask: val });
    });
});


app.get('/showTask', (req, res) => {
    //To show the data into page 'showTask.ejs
    taskSchema.find({}, function(err, val) {
        console.log(res.length);
        res.render('showTask.ejs', { todoTask: val });
    });
});


//Staring the express.Js server
app.listen(8080, () => {
    console.log('Hello ');
});