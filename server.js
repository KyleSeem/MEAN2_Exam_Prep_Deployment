// set variables required for node modules in order to use functionality in project
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 8000;
const app = express();

// tell project where to look for/how to use client-side content
app.use(express.static(path.resolve('public'))); // allow use of anything within 'public' folder
app.use(express.static(path.resolve('bower_components'))); // location of angular resources
app.use(bodyParser.json()); // tell body-parser to return form data as JSON objects

// tell project where to look for database and and routing info
require(path.resolve('server', 'config', 'mongoose'));
require(path.resolve('server', 'config', 'routes'))(app);

// listem for a connection to the server and notify when connected
app.listen(port, function(){
    console.log('listening on port:', port);
});
