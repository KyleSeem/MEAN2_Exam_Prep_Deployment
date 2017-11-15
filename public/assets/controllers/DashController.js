// dashboard controller

myApp.controller('DashController', ['$scope', 'userFactory', 'topicFactory', 'messageFactory', 'commentFactory', '$location', '$routeParams', '$cookies', function($scope, userFactory, topicFactory, messageFactory, commentFactory, $location, $routeParams, $cookies){
    $scope.sessionUser = $cookies.getObject('thisUser');
    $scope.category = [ 'animals', 'plants', 'geography', 'art', 'video games', 'general'];
    $scope.topics = [];
    $scope.search =[];
    $scope.newTopic = {};


    // get all topics
    $scope.getTopics = function(){
        topicFactory.index(function(response){
            var msg;
            for (var i = 0; i < response.length; i ++){
                response[i].msg = response[i]._messages.length;
            }
            $scope.topics = response;
        })
    }
    $scope.getTopics();

    // create new topic
    $scope.createTopic = function(){
        $scope.alerts = [];
        $scope.newTopic.username = $scope.sessionUser.username;
        $scope.newTopic._user = $scope.sessionUser._id;

        topicFactory.create($scope.newTopic, function(response){
            if (response.alerts){
                $scope.alerts = alerts;
            }
            else{
                $scope.newTopic = {};
            }
        })
        $scope.getTopics();
    }

    // find specifid topic via link
    $scope.findTopic = function($routeParams){
        $location.url('/topics/' + $routeParams);
    }

    // go to user's page - find method invoked by page init
    $scope.getUser = function(id){
        $location.url('/users/' + id);
    }

    // logout and clear cookies
    $scope.logout = function(){
        $cookies.remove('thisUser');
        $location.url('/');
    }

    $scope.checkCookies = function(){
        // console.log($location.$$path);
        // console.log($scope.sessionUser);
        if (!$scope.sessionUser){
            if ($location.$$path === '/settings'){
                $location.url('/settings');
            } else if ($location.$$path === '/login_reg'){
                    $location.url('/login_reg');
            } else{
                $location.url('/');
            }
        }
    }
    $scope.checkCookies();


/// these methods were used for testing
    // get all messages
    $scope.getMessages = function(){
        messageFactory.index(function(response){
            $scope.messages = response;
        })
    }

    // get all users
    $scope.getUsers = function(){
        userFactory.index(function(users){
            $scope.users = users;
        })
    }

    $scope.getComments = function(){
        commentFactory.index(function(comments){
            $scope.comments = comments;
        })
    }

    $scope.delete = function(id){
        userFactory.delete(id, function(response){
            $scope.getUsers();
        })
    }

}]); // close controller
