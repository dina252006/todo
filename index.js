const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use(require('./routes/router'))
app.use(require('./routes/todo'))



mongoose.connect("mongodb+srv://kozhaevadina15sh:lB1wLkADtpB1NxX5@backenddb.z7dj3.mongodb.net/BackendDB?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.log("Connection failed!", error);
    });




