'use strict';

var app = angular.module('app');
/* Bookmarks Controller */

app.controller('BookmarksController', ['$scope', 'BookmarksService', '$localStorage',
 function($scope, BookmarksService, $localStorage) {
  $scope.noBookmarks = false;
  $scope.newBookmark = false;
  $scope.userBookmarks = {};
  $scope.refresh = false;
  /*loadBookmarks load all user bookmarks*/
  $scope.loadBookmarks = function() {
    if($localStorage.userDetails) {
      $scope.app.userDetails = _.clone($localStorage.userDetails);
      BookmarksService.viewBookmarks($scope.app.apiURL, $scope.app.userDetails.id).then(function(response) {
        if(response) {
            $scope.userBookmarks = _.clone(response);
        }
        else {
          $scope.noBookmarks = true;
        }
      });
    }
  }
  /*Add new bookmarks*/
  $scope.bookmarkPanel = function() {
    $scope.newBookmark = true;
  }
  /*Refresh the page*/
  $scope.refreshPage = function() {
    location.reload();
  }
  /*Generate New Bookmarks*/
  $scope.addBookmark = function(name, url, tags) {
      BookmarksService.addNewBookmark($scope.app.apiURL, name, url, tags, $scope.app.userDetails.id).then(function(response) {
        if(response) {
          $scope.userBookmarks.push(response);
          $scope.noBookmarks = false;
          $scope.newBookmark = false;
        }
      });
  }
  /*Search bookmarks by tag*/
  $scope.search = function(tag) {
    BookmarksService.searchBookmark($scope.app.apiURL, tag, $scope.app.userDetails.id).then(function(response) {
      if(response) {
        $scope.userBookmarks = _.clone(response);
        $scope.refresh = true;
      }
    });
  }
}]);
