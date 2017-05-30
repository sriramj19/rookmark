'use strict';

angular.module('app')
  .controller('AppCtrl', ['$scope', '$state', '$localStorage', function($scope, $state, $localStorage) {

    $scope.app = {
      name: 'rookmark',
      version: '1.0.0',
      apiURL: 'http://' + location.host + '/',
      landing: function() {
        if($localStorage.userDetails) {
          $state.go('dashboard');
        }
        else {
          $state.go('login');
        }
      },
      logout: function() {
        $localStorage.$reset();
        delete $scope.app.userDetails;
        $state.go('login');
      }
    }

}]);
