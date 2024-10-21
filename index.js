const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


//routes
app.use(require('./routes/router'))
app.use(require('./routes/todo'))



mongoose.connect("mongodb+srv://kozhaevadina15sh:L2oMR8KKKwPydTcO@backenddb.z7dj3.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.log("Connection failed!", error);
    });




