// server-side urls - server receives request from public factory and routes to server-side controller for selected method

// console.log('Connection to server-side routes successful');
const path = require('path');

// identify location of server-side controller methods
const users = require('../controllers/users.js');
const topics = require('../controllers/topics.js');
const messages = require('../controllers/messages.js');
const comments = require('../controllers/comments.js');

// identify routes and associated methods and make available for export
module.exports = function(app){
    app.get('/users', users.index);
    app.get('/users/:id', users.show);
    app.post('/users/login', users.login);
    app.post('/users', users.create);
    app.delete('/users/:id', users.delete);

    app.get('/topics', topics.index);
    app.get('/topics/:id', topics.show);
    app.post('/topics', topics.create);

    app.get('/messages', messages.index);
    app.get('/messages/upVote/:id', messages.upVote);
    app.get('/messages/downVote/:id', messages.downVote);
    app.post('/messages', messages.create);

    app.get('/comments', comments.index);
    app.post('/comments', comments.create);

    app.all("*", (request, response, next) =>{
        response.sendFile(path.resolve("./public/index.html"))
    })
}; // close export
