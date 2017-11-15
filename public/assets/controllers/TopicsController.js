// topics controller - client-side

myApp.controller('TopicsController', ['$scope', 'topicFactory','messageFactory', 'commentFactory', '$location', '$routeParams', '$cookies', function($scope, topicFactory, messageFactory, commentFactory, $location, $routeParams, $cookies){
    $scope.sessionUser = $cookies.getObject('thisUser');
    $scope.topic = {};
    $scope.messages = [];
    $scope.newMessage = {};
    $scope.newComment = {};


    // show function invoked on page load, gathers data for topic by id (routeParams)
    $scope.show = function(){
        topicFactory.show($routeParams.id, function(response){
            $scope.messages = response.messages;
            $scope.topic = response.topic;
        });
    }

    $scope.getUser = function(id){
        $location.url('/users/' + id);
    }

    // create new message (request is sent to messageFactory)
    $scope.createMessage = function(){
        $scope.newMessage.username = $scope.sessionUser.username;
        $scope.newMessage._user = $scope.sessionUser._id;
        $scope.newMessage._topic = $routeParams.id;

        messageFactory.create($scope.newMessage, function(response){
            $scope.newMessage = {};
            $scope.topic = response;
            $scope.show();
        });
    }

    // create new comment // controller as t to establish new scope
    $scope.createComment = function(){
        $scope.newComment.username = $scope.sessionUser.username;
        $scope.newComment._user = $scope.sessionUser._id;
        $scope.newComment._message = this.message._id;

        commentFactory.create($scope.newComment, function(response){
            $scope.newComment = {};
            $scope.message.comments = response;
        });
    }

    // add 1 to message's upvotes
    $scope.upVote = function(id){
        messageFactory.upVote(id, function(response){
            $scope.message = response;
            $scope.show();
        })
    }

    // add 1 to message's downvotes
    $scope.downVote = function(id){
        messageFactory.downVote(id, function(response){
            $scope.message = response;
            $scope.show();
        })
    }

}]); // close TopicsController
