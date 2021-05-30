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

app.use(express.json());
app.listen(8000, () => {
    console.log("Server Connected on Port 8000");
})

app.get("/", (req, res) => {
    res.send("Hello");
})