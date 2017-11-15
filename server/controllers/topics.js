// server-side controller specific to Topics model // include access to all other models
// console.log('Connection to server-side TOPICS controller successful');

const mongoose = require('mongoose');
const Topics = mongoose.model('Topics');
const Users = mongoose.model('Users');
const Messages = mongoose.model('Messages');

module.exports = {
    // find all topics
    index: (request, response) =>{
        Topics.find({})
        .then(function(topics){
            response.json(topics);
        })
        .catch(function(error){
            response.send(error);
        })
    },

    // find one topic by id and populate related messages
    show: (request, response) =>{
        Topics.findById(request.params.id)
        .then(function(topic){
            var topID = topic._id;
            var Top = {};
            Messages.find({ _topic:topID }).
            populate({
                path: '_messages',
                match: { _id:topID },
                select: '_id username message up_votes down_votes comments created_at',
            }).
            exec(function(error, messages){
                if (error){ console.log(error); }
                else{
                    Topic = {
                        topic:topic,
                        messages:messages,
                    };
                    response.json(Topic);
                }
            })
        })
        .catch(function(error){
            response.send(error);
        })
    },

    // create new topic
    create: (request, response) =>{
        Topics.create(request.body)
        .then(function(topic){
            let usrID = topic._user;
            Users.findById(usrID, function(error, user){
                if (error){ console.log(error); }
                else{
                    topic.save(function(error){
                        user._topics.push(topic._id);
                        user.save(function(error){
                            if (error){ console.log(error); }
                            else{
                                response.json(topic);
                            }
                        })
                    })
                }
            })
        })
        .catch(function(error){
            response.send(error);
        })
    },

}; // close export
