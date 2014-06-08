'use strict';

module.exports = function (app) {

  app.run(['$templateCache', function($templateCache) {
    $templateCache.put('signup.html', require('./signup.html') );
  }]);

  app.controller('SignupCtrl', ['$scope','$location', function( $scope, $location ){

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
       console.log("Form inputs=", angular.toJson( $scope.user ) );

      // display You have successfully registered for access to this application. in /home
    };

    $scope.doCancel = function() {
      $location.path("/login");
    };
  }]);
};
