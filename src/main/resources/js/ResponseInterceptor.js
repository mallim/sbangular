'use strict';

module.exports = function (app) {

  /**
   * Structure from http://blog.brunoscopelliti.com/http-response-interceptors
   * Code from https://github.com/Robert-Leggett/angular_bootstrap_spring
   */
  app.config(['$rootScope','$httpProvider', function( $rootScope, $httpProvider ) {

    /*
     Response interceptors are stored inside the
     $httpProvider.responseInterceptors array.
     To register a new response interceptor is enough to add
     a new function to that array.
     */

    $httpProvider.responseInterceptors.push(['$q', function($q) {

      // More info on $q: docs.angularjs.org/api/ng.$q
      // Of course it's possible to define more dependencies.

      return function(promise) {

        /*
         The promise is not resolved until the code defined
         in the interceptor has not finished its execution.
         */

        return promise.then(function(response) {

          // response.status >= 200 && response.status <= 299
          // The http request was completed successfully.

          /*
           Before to resolve the promise
           I can do whatever I want!
           For example: add a new property
           to the promise returned from the server.
           */

          /*
           Return the execution control to the
           code that initiated the request.
           */

          return response;

        }, function(response) {

          // The HTTP request was not successful.

          /*
           It's possible to use interceptors to handle
           specific errors. For example:
           */

          //error -> if 401 save the request and broadcast an event
          if (response.status === 401) {
            var deferred = $q.defer();
            var req = {
              config: response.config,
              deferred: deferred
            };
            $rootScope.requests401.push(req);
            $rootScope.$broadcast('event:loginRequired');

            return deferred.promise;
          }

          /*
           $q.reject creates a promise that is resolved as
           rejectedwith the specified reason.
           In this case the error callback will be executed.
           */

          return $q.reject(response);

        });

      };

    }]);

  }]);

};
