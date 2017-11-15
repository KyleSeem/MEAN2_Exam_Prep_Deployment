// // server-side controller specific to Messages model // include access to all other models
// console.log('Connection to server-side POSTS controller successful');

const mongoose = require('mongoose');
const Messages = mongoose.model('Messages');
const Users = mongoose.model('Users');
const Topics = mongoose.model('Topics');


module.exports = {
    // find all messages
    index: (request, response) =>{
        Messages.find({})
        .then(function(messages){
            response.json(messages);
        })
        .catch(function(error){
            response.send(error);
        })
    },

    // increase message's upvote by 1
    upVote: (request, response) =>{
        Messages.findById(request.params.id)
        .then(function(message){
            message.up_votes ++;
            message.save(function(error){
                if (error){ console.log(error); }
                else{
                    response.json(message);
                }
            })
        })
        .catch(function(error){
            response.send(error);
        })
    },

    // increase message's downvote by 1
    downVote: (request, response) =>{
        Messages.findById(request.params.id)
        .then(function(message){
            message.down_votes ++;
            message.save(function(error){
                if (error){ console.log(error); }
                else{
                    response.json(message);
                }
            })
        })
        .catch(function(error){
            response.send(error);
        })
    },

    // create new message // push message id to user and topic
    create: (request, response) =>{
        Messages.create(request.body)
        .then(function(message){
            let usrID = message._user;
            let topID = message._topic;
            Users.findById(usrID, function(error, user){
                if (error){ console.log(error); }
                else{
                    Topics.findById(topID, function(error, topic){
                        if (error){ console.log(error); }
                        else{
                            message.save(function(error){
                                user._messages.push(message._id);
                                user.save(function(error){
                                    if (error){ console.log(error); }
                                });
                                topic._messages.push(message._id);
                                topic.save(function(error){
                                    if (error){ console.log(error); }
                                    else{
                                        response.json(topic);
                                    }
                                })
                            })
                        }
                    })
                }
            })
        })
        .catch(function(error){
            response.send(error);
        })
    },

}; // close export
