'use strict';
/*jshint -W069 */

// http://www.bennadel.com/blog/2527-defining-instantiatable-classes-in-the-angularjs-dependency-injection-framework.htm
// To define an instantiatable class / constructor, we can
// use either the Factory() of the Value() method. I prefer
// the Factory since it allows for dependency injection.

module.exports = function (app) {

  app.service('AuthService', ["$http", "$rootScope", "$q", function( $http, $rootScope, $q ){

    var base64Service = require("./Base64Service");
    var Base64Service = base64Service.makeService();

    var httpHeaders = $http.defaults.headers;

    // Define the constructor function.
    function AuthService(){
    }

    // Define the "class" / "static" methods. These are
    // utility methods on the class itself; they do not
    // have access to the "this" reference.
    AuthService.login = function( $scope, username, password  ) {

      console.log("Inside AuthService.login, username=", username, ",password=", password, ",httpHeaders", httpHeaders );
      $scope.$emit( 'event:loginRequest', username, password );

      // set the basic authentication header that will be parsed in the next request and used to authenticate
      httpHeaders.common['Authorization'] = 'Basic ' + Base64Service.encode(username + ':' + password);

      var authenticateUrl = $http.post('user/authenticate');
      var retrieveUserUrl = $http.get('user/authenticated/retrieve');

      $q.all([authenticateUrl, retrieveUserUrl])
        .then(function(results) {
            // console.log("results[1] ", results[ 1 ] );
            if( results[ 1 ] )
            {
              $rootScope.user = results[ 1 ].data;
              // console.log("Got the user to be ", user );
              $rootScope.$broadcast('event:loginConfirmed');
              delete $rootScope.error;
            }

            return results[1].data;
        }
      );
    };

    AuthService.isLoggedIn = function( user ) {
      if( user === undefined ) user = $rootScope.user;
      return user.authorities.length > 0;
    };

    AuthService.logout = function( $scope ) {
      var d = $q.defer();

      $http.get('j_spring_security_logout').success(function() {
        $rootScope.user = null;
        $scope.$emit('event:logoutRequest');
        d.resolve();
      });

      return d.promise;
    };

    // Return constructor - this is what defines the actual
    // injectable in the DI framework.
    return(AuthService);

}]);};



