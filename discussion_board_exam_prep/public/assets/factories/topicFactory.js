// topic factory

myApp.factory('topicFactory', ['$http', function($http){
    const factory = {};
    alerts = [];

    // get all customers
    factory.index = function(callback){
        $http.get('/topics')
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // find one topic and retrieve info
    factory.show = function(id, callback){
        $http.get('/topics/' + id)
        .then(function(response){
            callback(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    // create new topic
    factory.create = function(topic, callback){
        $http.post('/topics', topic)
        .then(function(response){
            alerts = [];

            if (response.data.errors){
                var err = response.data.errors;
                for (var msg in err){
                    var alert = (err[msg].message);
                    alerts.push(alert);
                }
                callback({alerts:alerts});
            } else{
                // console.log(response.data);
                callback(response.data);
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

    return factory;
}]); // close factory
