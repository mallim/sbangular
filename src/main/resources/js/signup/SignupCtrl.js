'use strict';

module.exports = function (app) {

  app.run(['$templateCache', function($templateCache) {
    $templateCache.put('signup.html', require('./signup.html') );
  }]);

  app.controller('SignupCtrl', ['$scope','$location', '$rootScope', "messagesForHome",
    function( $scope, $location, $rootScope, messagesForHome ){

    $scope.oneAtATime = true;
    $scope.status = {
      isFirstOpen: false,
      isFirstDisabled: false
    };

    $scope.doSignup = function( form ) {

      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        console.log("Returning because form is invalid");
        return;
      }

      var user = {
        username:$scope.username,
        password:$scope.password,
        passwordHint:$scope.passwordHint
      };

      console.log("Form inputs=", angular.toJson( user ) );

      // display You have successfully registered for access to this application. in /home
      messagesForHome.registerSuccess = true;
      $location.path("/home");

    };

    $scope.doCancel = function() {
      $location.path("/login");
    };
  }]);
};
