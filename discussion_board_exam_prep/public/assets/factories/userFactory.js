// user factory

myApp.factory('userFactory', ['$http', function($http){
    const factory = {};
    alerts = [];

    // get all customers // only called by settings page
    factory.index = function(callback){
        $http.get('/users')
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // create new user
    factory.create = function(user, callback){
        $http.post('/users', user)
        .then(function(response){
            alerts = [];
            if (response.data.errors){
                var err = response.data.errors;
                for (var msg in err){
                    var alert = (err[msg].message);
                    alerts.push(alert);
                }
                callback({alerts:alerts});
            }
            else if (response.data.code === 11000){
                alerts.push('This email address has already been registered');
                callback({alerts:alerts});
            }
            else{
                // console.log(response.data);
                callback(response.data);
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // find one user from form input (post method, used in login form)
    factory.login = function(user, callback){
        alerts = [];
        $http.post('/users/login', user)
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // find one user from link (get method, takes to user's page)
    factory.show = function(id, callback){
        $http.get('/users/' + id)
        .then(function(response){
            // console.log(response.data);
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // delete a user by id
    factory.delete = function(id, callback){
        $http.delete('/users/' + id)
        .then(function(response){
            // console.log(response);
            callback(response.data);
        })
    }

    return factory;
}]); // close factory
