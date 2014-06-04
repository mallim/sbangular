require("angular");
require("angular-route");
require('angular-strap');

var app = angular.module('sbangularApp', ['ngRoute','mgcrea.ngStrap']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/login',{templateUrl:'login.tpl',controller:"LoginCtrl"})
        .when('/home',{templateUrl:'home.tpl',controller:null})
        .otherwise({redirectTo: '/login'});
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

        console.log("Going to redirect to /home");

        $location.path( "/home" );
    }

}]);



