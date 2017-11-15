// declare client-side urls for angular partials, if only one controller is used on that partial, declare the controller

myApp.config(function($routeProvider){
    $routeProvider
    .when('/login_reg', {
        templateUrl: '../partials/index.html',
        controller: 'UsersController',
    })
    .when('/dashboard', {
        templateUrl: '../partials/dashboard.html',
        controller: 'DashController',
    })
    .when('/topics/:id', {
        templateUrl: '../partials/topic.html',
        controller: 'TopicsController',
    })
    .when('/users/:id', {
        templateUrl: '../partials/user.html',
        controller: 'UsersController',
    })
    // settings page used for testing
    // .when('/settings', {
    //     templateUrl: '../partials/settings.html',
        // controller: 'DashController',
    // })
    .otherwise({
        redirectTo: '/login_reg',
    });

}); // close
