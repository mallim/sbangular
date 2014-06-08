'use strict';

module.exports = function (app) {

  app.run(['$templateCache', function($templateCache) {
    $templateCache.put('login.html', require('./login.html') );
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

};

