'use strict';

/**
 * Structure idea from http://ardeibert.com/modularizing-an-angularjs-app-with-browserify/
 * Source from https://github.com/Robert-Leggett/angular_bootstrap_spring
 * @constructor
 */
module.exports = function (app) {
  app.service('AuthenticationService', [ "$http", "$q", function ($http, $q) {
    this.logout = function() {
      var d = $q.defer();

      $http.get('j_spring_security_logout').success(function() {
        d.resolve();
      });

      return d.promise;
    };
  }]);
}
