// users controller - client-side

myApp.controller('UsersController', ['$scope', 'userFactory', '$location', '$routeParams', '$cookies', function($scope, userFactory, $location, $routeParams, $cookies){
    $scope.sessionUser = $cookies.getObject('thisUser');
    $scope.user = {};
    $scope.newUser = {};
    $scope.alerts = [];
    $scope.alertType = '';


    // register/create new user
    $scope.register = function(){
        alerts = [];
        $scope.alertType = '';

        if ($scope.newUser.confirm != $scope.newUser.password){
            alerts.push("Passwords do not match");
            $scope.alerts = alerts;
            $scope.alertType = 'reg';
        }
        else{
            userFactory.create($scope.newUser, function(response){
                if (response.alerts){
                    $scope.alerts = alerts;
                    $scope.alertType = 'reg';
                }
                else{
                    // console.log('User has been created:', response);
                    $location.url('/dashboard');
                    $cookies.putObject('thisUser', response);
                }
            });
        }
    }

    // login for existing user
    $scope.login = function(){
        alerts = [];
        $scope.alertType = '';

        if (!$scope.user.email | !$scope.user.password){
            alerts.push("Email or Password missing from login");
            $scope.alerts = alerts;
            $scope.alertType = 'log';
        }
        else{
            userFactory.login($scope.user, function(response){
                if (response.alert){
                    alerts.push(response.alert);
                    $scope.alerts = alerts;
                    $scope.alertType = 'log';
                }
                else{
                    // console.log('found this user:', response);
                    $location.url('/dashboard');
                    $cookies.putObject('thisUser', response);
                }
            });
        }
    }

    $scope.show = function(){
        userFactory.show($routeParams.id, function(response){
            $scope.tps = response._topics.length;
            $scope.msg = response._messages.length;
            $scope.cmt = response._comments.length;
            $scope.user = response;
        })
    }

}]); // close controller
