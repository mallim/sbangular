'use strict';

module.exports = function (app) {

  app.run(['$templateCache', function($templateCache) {
    $templateCache.put('home.html', require('./home.html') );
  }]);

  app.value("messagesForHome", {registerSuccess:false} );

  app.controller('HomeCtrl', ['$scope', '$location', '$rootScope', "messagesForHome",
  function( $scope, $location, $rootScope, messagesForHome )
  {
    $scope.alerts = [
      // { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
      // { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    if( messagesForHome.registerSuccess )
    {
      $scope.alerts.push({
        type:'success',
        msg:"You have successfully registered for access to this application."
      });
      messagesForHome.registerSuccess = false;
    }

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

  }]);

};


