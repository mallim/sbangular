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

    var store = require("store2");

    var httpHeaders = $http.defaults.headers;

    // Define the constructor function.
    function AuthService(){
      if (store.session.has("userInfo")) {
        $rootScope.userInfo = angular.toJson(store.session.get("userInfo"));
      }
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

      var deferred = $q.defer();

      $q.all([authenticateUrl, retrieveUserUrl])
        .then(function(results) {
            // console.log("results[1] ", results[ 1 ] );
            if( results[ 1 ] )
            {
              $rootScope.user = results[ 1 ].data;
              var userInfo = {
                authorities: results[ 1 ].data.authorities,
                userName: results[ 1 ].data.username
              };
              store.session.set( "userInfo", angular.toJson( userInfo ) );
              $rootScope.userInfo = userInfo;
              // console.log("Got the user to be ", user );
              $rootScope.$broadcast('event:loginConfirmed');
              delete $rootScope.error;
            }

            deferred.resolve(results[1].data);
        },
        function(error) {
          deferred.reject(error);
        }
      );

      return deferred.promise;
    };

    AuthService.isLoggedIn = function( user ) {
      if( $rootScope.userInfo === undefined && store.session.has("userInfo") )
      {
        $rootScope.userInfo = angular.toJson(store.session.get("userInfo"));
      }
      return $rootScope.userInfo.authorities.length > 0;
    };

    AuthService.getUserInfo = function() {
      return $rootScope.userInfo;
    };

    AuthService.logout = function( $scope ) {
      var deferred = $q.defer();

      $http.get('j_spring_security_logout')
        .then(function() {
          store.session.remove("userInfo");
          $rootScope.user = null;
          $rootScope.userInfo = null;
          $scope.$emit('event:logoutRequest');
          deferred.resolve();
        },
          function(error) {
            deferred.reject(error);
        }
      );

      return deferred.promise;
    };

    // Return constructor - this is what defines the actual
    // injectable in the DI framework.
    return(AuthService);

  }]);
};



