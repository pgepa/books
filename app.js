'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const bookRoutes = require('./routes/book.routes');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object
const db = mysql.createConnection ({
    host: process.env.HOST,
    user: process.env.USUARIO,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// connect to database
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connected to Database');
});
global.db = db;

//configure middleware
app.set('port', process.env.port || port);//set express to use this  port
app.set('views', __dirname + '/views')//set express to look in this folder to render our view;
app.set('view engine', 'ejs');//configure template engine
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());//parse from data client
app.use(express.static(path.join(__dirname, 'public')));//confifure express to use public folder
app.use(fileUpload());//configure Fileupload

app.use('/', bookRoutes);

//set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});