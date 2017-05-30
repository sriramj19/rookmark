'use strict';

var app = angular.module('app');
// var _ = require('lodash');
/* Users Controller */

app.controller('UsersController',
['$scope', 'UsersService', '$localStorage', '$state', 
function($scope, UsersService, $localStorage, $state) {
  $scope.checkUser = function() {
    if($localStorage.userDetails) {
      $scope.app.userDetails = _.clone($localStorage.userDetails);
    }
  }
  $scope.login = function() {
    if($scope.emailAddress && $scope.password) {
      UsersService.signin($scope.app.apiURL, $scope.emailAddress, $scope.password).then(function(response) {
        if(response) {
          $localStorage.userDetails = _.clone(response);
          $scope.app.userDetails = _.clone(response);
          $state.go('dashboard');
        }
      });
    }
  }
  $scope.register = function() {
    if($scope.emailAddress && $scope.password) {
      UsersService.signup($scope.app.apiURL, $scope.emailAddress, $scope.password).then(function(response) {
        if(response) {
          $localStorage.userDetails = _.clone(response);
          $scope.app.userDetails = _.clone(response);
          $state.go('dashboard');
        }
      })
    }
  }
}]);
