// message factory

myApp.factory('messageFactory', ['$http', function($http){
    const factory = {};

    // get all messages
    factory.index = function(callback){
        $http.get('/messages')
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // create new message
    factory.create = function(message, callback){
        $http.post('/messages', message)
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // update votes - up vote
    factory.upVote = function(id, callback){
        $http.get('/messages/upVote/' + id)
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // update votes - down vote
    factory.downVote = function(id, callback){
        $http.get('/messages/downVote/' + id)
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    return factory;
}]); // close factory
