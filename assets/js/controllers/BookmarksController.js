'use strict';

var app = angular.module('app');
/* Bookmarks Controller */

app.controller('BookmarksController', ['$scope', 'BookmarksService', '$localStorage',
 function($scope, BookmarksService, $localStorage) {
  $scope.loadBookmarks = function() {
    if($localStorage.userDetails) {
      $scope.app.userDetails = _.clone($localStorage.userDetails);
    }
  }
}]);
