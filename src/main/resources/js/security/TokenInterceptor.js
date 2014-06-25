"use strict";

/**
 * Based on the idea in http://www.kdelemme.com/2014/03/09/authentication-with-angularjs-and-a-node-js-rest-api/
 * @param app
 */
module.exports = function (app) {

  app.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {

    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },

      requestError: function(rejection) {
        return $q.reject(rejection);
      },

      /* Set Authentication.isAuthenticated to true if 200 received */
      response: function (response) {
        if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
          AuthenticationService.isAuthenticated = true;
        }
        return response || $q.when(response);
      },

      /* Revoke client authentication if 401 is received */
      responseError: function(rejection) {
        if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
          delete $window.sessionStorage.token;
          AuthenticationService.isAuthenticated = false;
          $location.path("/admin/login");
        }

        return $q.reject(rejection);
      }
    };
  });


};


