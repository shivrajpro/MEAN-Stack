const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');

app.listen(8000, ()=>{
    console.log("Server Connected on Port 8000");
})

app.get("/",(req,res)=>{
    res.send("Hello");
})