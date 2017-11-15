// server-side controller specific to Comments model // include access to all other models
// console.log('Connection to server-side COMMENTS controller successful');

const mongoose = require('mongoose');
const Comments = mongoose.model('Comments');
const Users = mongoose.model('Users');
const Messages = mongoose.model('Messages');

module.exports = {
    // get all comments
    index: (request, response) =>{
        Comments.find({})
        .then(function(comments){
            response.json(comments);
        })
        .catch(function(error){
            console.log(error);
        })
    },

    //create comment // push comment id to user // push comment id to message //
    create: (request, response) =>{
        // console.log('request.body', request.body);
        Comments.create(request.body)
        .then(function(comment){
            let usrID = comment._user;
            let msgID = comment._message;
            Users.findById(usrID, function(error, user){
                if (error){ console.log(error); }
                else{
                    Messages.findById(msgID, function(error, message){
                        if (error){ console.log(error); }
                        else{
                            comment.save(function(error){
                                user._comments.push(comment._id);
                                user.save(function(error){
                                    if (error){ console.log(error); }
                                });
                                message._comments.push(comment._id);
                                message.comments.push(comment);
                                message.save(function(error){
                                    if (error){ console.log(error); }
                                    else{
                                        // console.log('MESSAGE', message.comments);
                                        comments = message.comments;
                                        response.json(comments);
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
