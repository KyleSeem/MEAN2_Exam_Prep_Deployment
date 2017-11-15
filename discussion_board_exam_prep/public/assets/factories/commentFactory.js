// comment factory

myApp.factory('commentFactory', ['$http', function($http){
    const factory = {};

    // get all comments
    factory.index = function(callback){
        $http.get('/comments')
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // create new comment
    factory.create = function(comment, callback){
        $http.post('/comments', comment)
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    return factory;
}]); // close factory
