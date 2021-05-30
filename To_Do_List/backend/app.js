const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');

/* 
CORS: Cross Origin Request Security
localhost:8000 - backend API
localhost:4200 - frontend
*/
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,HEAD,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/* 
List: Create, Update, ReadOne, ReadAll, Delete
Task: Create, Update, ReadOne, ReadAll, Delete
*/
const List = require('./database/models/list');
const Task = require('./database/models/task');
app.use(express.json());

app.get('/lists', (req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch(e => console.log(e))
})


app.post('/lists', (req, res) => {
    (new List({ 'title': req.body.title }))
        .save()
        .then(list => res.send(list))
        .catch(e => console.log(e))
})

app.listen(8000, () => {
    console.log("Server Connected on Port 8000");
})

app.get("/", (req, res) => {
    res.send("Hello");
})