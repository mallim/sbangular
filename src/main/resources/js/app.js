require("angular");
require("angular-route");
require('angular-bootstrap');

/**
 * ui.bootstrap is from angular-bootstrap
 * It is being use to do the accordion for the Address
 */
var app = angular.module('sbangularApp', ['ngRoute','ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/login',{
            title:'Login',
            templateUrl:'login.tpl',
            controller:"LoginCtrl"
        })
        .when('/home',{
            title:'Home',
            templateUrl:'home.tpl',
            controller:null
        })
        .when('/userform',{
            title:'User Settings',
            templateUrl:'userSettings.tpl',
            controller:"UserSettingsCtrl"
        })
        .when('/updatePassword',{
            title:'Update Your Password',
            templateUrl:'updatePassword.tpl',
            controller:null
        })
        .when('/logout',{
          title:'Login',
          templateUrl:'login.tpl',
          controller:null
        })
        .when('/signup',{
          title:'Sign Up',
          templateUrl:'signup.tpl',
          controller:null
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

app.controller('UserSettingsCtrl', ['$scope',function($scope){
    $scope.oneAtATime = true;
    $scope.status = {
        isFirstOpen: false,
        isFirstDisabled: false
    };
}]);

app.factory('messageService',[ '$rootScope', function ($rootScope) {
    var messenger = {
        messages: [],
        identity: 0,
        notifyLogin: function (text, caller) {

            this.identity += 1;
            var id = this.identity,
                message = {
                    text: caller + text,
                    id: id
                };

            this.messages.push(message);
            $rootScope.$broadcast('notifyLogin');
        }
    };

    return messenger;
}]);

app.controller('NavCtrl', ['$scope', 'messageService',
    function( $scope, messageService )
{
    $scope.role = null;

    $scope.$on('notifyLogin', function() {
        $scope.role = "user";
    });
}]);

app.controller('LoginCtrl', ['$scope', '$location', 'messageService',
    function( $scope, $location, messageService )
{

    $scope.login = function(form) {
        // Trigger validation flag.
        $scope.submitted = true;

        // If form is invalid, return and let AngularJS show validation errors.
        // if (form.$invalid) {
            // return;
        // }

        messageService.notifyLogin("successfully login", "LoginCtrl");

        $location.path( "/home" );
    }

}]);

/**
 * This part will change the html's header title
 */
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);



