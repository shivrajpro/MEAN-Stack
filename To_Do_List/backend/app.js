// https://www.youtube.com/watch?v=E-GA9GKJWuE&t=7224s
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
// A list can contain any number of tasks
const List = require('./database/models/list');
const Task = require('./database/models/task');
app.use(express.json());

// ENDPOINTS for Lists
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

app.get('/lists/:listId', (req, res) => {
    List.find({ '_id': req.params.listId })
        .then(list => res.send(list))
        .catch(e => console.log(e))
})

app.patch('/lists/:listId', (req, res) => {
    List.findOneAndUpdate({ '_id': req.params.listId }, { $set: req.body })
        .then(list => res.send(list))
        .catch(e => console.log(e))
})

app.delete('/lists/:listId', (req, res) => {
    List.findByIdAndDelete(req.params.listId)
        .then(list => res.send(list))
        .catch(e => console.log(e))
})

// ENDPOINTS for tasks
app.get("/lists/:listId/tasks", (req, res) => {
    Task.find({ _listId: req.params.listId })
        .then(task => res.send(task))
        .catch(e => console.log(e))
})

app.post("/lists/:listId/tasks", (req, res) => {
    (new Task({ 'title': req.body.title, _listId: req.params.listId }))
        .save()
        .then(task => res.send(task))
        .catch(e => console.log(e))

})

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOne({ _listId: req.params.listId, _id: req.params.taskId })
        .then(task => res.send(task))
        .catch(e => console.log(e))
})

app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndUpdate({ _listId: req.params.listId, _id: req.params.taskId }, { $set: req.body })
        .then(task => res.send(task))
        .catch(e => console.log(e))
})

app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndDelete({ _listId: req.params.listId, _id: req.params.taskId })
        .then(task => res.send(task))
        .catch(e => console.log(e))
})

app.listen(8000, () => {
    console.log("Server Connected on Port 8000");
})

app.get("/", (req, res) => {
    res.send("Hello");
})