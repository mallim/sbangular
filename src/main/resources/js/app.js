'use strict';
/*jshint -W069 */

require("angular");
require("angular-route");
require('angular-bootstrap');

/**
 * Idea from https://github.com/thedigitalself/angular-sprout
 * The application file bootstraps the angular app by  initializing the main module and
 * creating namespaces and moduled for controllers, filters, services, and directives.
 */

var httpHeaders;
var originalLocation = "/login";

/**
 * ui.bootstrap is from angular-bootstrap
 * It is being use to do the accordion for the Address
 */
var app = angular.module('application', [ 'ngRoute','ui.bootstrap']);

/**
 * Idea from http://ardeibert.com/modularizing-an-angularjs-app-with-browserify/
 */
require("./security/AuthService")(app);
require("./security/ResponseInterceptor")(app);

app.config(['$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ){

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
        .when('/signup',{
          title:'Sign Up',
          templateUrl:'signup.tpl',
          controller:null
        })
        .otherwise({
            redirectTo: '/login'
        });

    $locationProvider.html5Mode(true);
}]);

app.controller('UserSettingsCtrl', ['$scope',function($scope){
    $scope.oneAtATime = true;
    $scope.status = {
        isFirstOpen: false,
        isFirstDisabled: false
    };
}]);

app.controller('NavCtrl', ['$scope', "$location", 'AuthService', function( $scope, $location, AuthService )
{

  $scope.logout = function () {

    AuthService.logout( $scope ).then(function() {
      $scope.username = $scope.password = null;
      $scope.user = null;
      console.log("Inside logout then, redirect to /");
      $location.path("/");
    });

  };

}]);

app.controller('LoginCtrl', ['$scope', '$location', 'AuthService', function( $scope, $location, AuthService )
{

    $scope.login = function(form) {

        // Trigger validation flag.
        $scope.submitted = true;

        // If form is invalid, return and let AngularJS show validation errors.
        // if (form.$invalid) {
            // return;
        // }

        console.log("$scope.username??=",$scope.username);
        console.log("$scope.password=",$scope.password);
        AuthService.login( $scope, $scope.username, $scope.password )
         .then(function (result) {
            $location.path("/home");
         }, function (error) {
            $scope.alerts.push({type:'danger', msg: 'Invalid credentials!'});
            console.log(error);
         });
    },

    $scope.closeAlert = function(index) {
      $scope.alerts.splice( index, 1 );
    };
}]);

/**
 * This part will change the html's header title
 */
app.run(['$location', '$rootScope', '$http', function( $location, $rootScope, $http ) {

  /**
   * Holds all the requests which failed due to 401 response.
   */
  $rootScope.requests401 = [];

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    if( current.$$route )
    {
      $rootScope.title = current.$$route.title;
    }
  });

  $rootScope.$on('event:loginRequired', function () {
    $rootScope.requests401 = [];

    if ($location.path().indexOf("/login") == -1) {
      originalLocation = $location.path();

      $rootScope.error = "Please enter a valid username / password";
    }

    $location.path('/login');
  });

  /**
   * On 'event:loginConfirmed', resend all the 401 requests.
   */
  $rootScope.$on('event:loginConfirmed', function () {
    var i,
        requests = $rootScope.requests401,
        retry = function (req) {
          $http(req.config).then(function (response) {
            req.deferred.resolve(response);
          });
        };

    for (i = 0; i < requests.length; i += 1) {
      retry(requests[i]);
    }
    $rootScope.requests401 = [];
  });

  /**
   * On 'logoutRequest' invoke logout on the server.
   */
  /**
  $rootScope.$on('event:logoutRequest', function () {
    httpHeaders.common['Authorization'] = null;
    originalLocation = "/login";
  });
  **/

  httpHeaders = $http.defaults.headers;

}]);



