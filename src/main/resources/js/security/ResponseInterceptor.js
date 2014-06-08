'use strict';

module.exports = function (app) {

  /**
   * Structure from http://blog.brunoscopelliti.com/http-response-interceptors
   * Code from https://github.com/Robert-Leggett/angular_bootstrap_spring
   */
  app.config(['$httpProvider', function( $httpProvider ) {

    var interceptor = ['$location', '$q', function($location, $q) {
      function success(response) {
        return response;
      }

      function error(response) {

        if(response.status === 401) {
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

      return function(promise) {
        return promise.then(success, error);
      };
    }];

    $httpProvider.responseInterceptors.push(interceptor);

  }]);

};