'use strict';

angular.module('app')
  .controller('AppCtrl', ['$scope', '$state', function($scope, $state) {

    $scope.app = {
      name: 'Angular-Starter',
      version: '1.0.0'
    }

}]);
