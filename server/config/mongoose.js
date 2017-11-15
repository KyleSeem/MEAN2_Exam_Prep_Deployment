// enables use of mongoose and desired database

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const models_path = path.resolve('server', 'models');

// indentify desired database and tell mongoose where to find it
mongoose.connect('mongodb://localhost/discussion_board_db', { useMongoClient: true });

// notify successful connection to mongoose
mongoose.connection.on('connected', function(){
    console.log('Connection to mongoose successful');
});

// make all odels files available
fs.readdirSync(models_path).forEach(function(file){
    if (file.indexOf('.js') >= 0){
        require(path.join(models_path, file));
    }
});
