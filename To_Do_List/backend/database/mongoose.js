const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/todo_list")
    .then(() => console.log("Database Connection Successful!"))
    .catch(e => console.log("Database Connection Failed!", e));

module.exports = mongoose;