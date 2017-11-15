// server-side controller specific to Users model // include access to all other models
// console.log('Connection to server-side USERS controller successful');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Topics = mongoose.model('Topics');
const Messages = mongoose.model('Messages');
const Comments = mongoose.model('Comments');

module.exports = {
    // find all users
    index: (request, response) =>{
        Users.find({})
        .then(function(users){
            response.json(users);
        })
        .catch(function(error){
            response.send(error);
        })
    },

    // find one user by id for validation
    login: (request, response) =>{
        Users.findOne({ email: request.body.email })
        .then(function(user){
            if (!user){
                response.send({ alert: "The email entered is either incorrect or has not been registered"});
            }
            else{
                var prospect = request.body.password; // user input submitted by login
                var hashed = user.password; // password in database
                // console.log('PROSPECT*******', prospect);
                // console.log('HASHED*******', hashed);

                bcrypt.compare(prospect, hashed)
                .then(function(res){
                    // console.log(res);
                    if (res === false){
                        response.send({ alert: "The password entered is incorrect" });
                    }
                    else if (res === true){
                        response.json(user);
                    }
                });
            }
        })
        .catch(function(error){
            response.send(error);
        })
    },

    // find one user by id to display details
    show: (request, response) =>{
        Users.findById(request.params.id)
        .then(function(user){
            response.json(user);
        })
        .catch(function(error){
            response.send(error);
        })
    },

    // create new user
    create: (request, response) =>{
        // after user is created, encrypt provided password and update new user to store hashed password in database
        Users.create(request.body)
        .then(function(user){
            // console.log('PW:::::', user.password);
            var hashed = bcrypt.hashSync(user.password, 10);
            // user.update({$set: {password: hashed }})
            user.password = hashed;
            user.save(function(error){
                if (error){ response.send(error); }
                else{ response.json(user); }
            });
        })
        .catch(function(error){
            response.send(error);
        })
    },

    // delete a user by id
    delete: (request, response) =>{
        Users.findByIdAndRemove(request.params.id)
        .then(function(users){
            response.json(users);
        })
        .catch(function(error){
            response.send(error);
        })
    },

}; // close export
