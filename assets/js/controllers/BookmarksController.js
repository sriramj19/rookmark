'use strict';

var app = angular.module('app');
/* Bookmarks Controller */

app.controller('BookmarksController', ['$scope', 'BookmarksService', '$localStorage',
 function($scope, BookmarksService, $localStorage) {
  /*loadBookmarks load all user bookmarks*/
  $scope.loadBookmarks = function() {
    $scope.noBookmarks = false;
    $scope.newBookmark = false;
    $scope.userBookmarks = [];
    $scope.refresh = false;
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
    $scope.newBookmark = !$scope.newBookmark;
  }
  /*Refresh the view*/
  $scope.refreshPage = function() {
    $scope.loadBookmarks();
    $scope.searchTag = "";
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
  /*Bookmarks filtered by tag*/
  $scope.bookmarks = function(tag) {
    if(tag)
      tag = tag.toLowerCase();
    $scope.searchResults = [];
    if(!tag)
      return $scope.userBookmarks;
    _.forEach($scope.userBookmarks, function(value) {
      _.forEach(value.tags, function(filterTag) {
        if(_.includes(filterTag, tag)) {
          $scope.searchResults.push(value);
          return false;
        }
      });
    });
    return $scope.searchResults;
  }
}]);
