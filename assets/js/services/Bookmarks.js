'user strict';

var app = angular.module('app');
/* Bookmarks Service */

app.factory('BookmarksService', function($http) {
  return {
    //API for viewing bookmarks
    viewBookmarks: function(url, id) {
      return $http.get(url + 'bookmarks/read/' + id).then(function(response) {
        if(response) {
          return response.data;
        }
      }, function(x) {
        console.log(x.data.error);
      });
    },
    //API for adding new bookmarks
    addNewBookmark: function(apiURL, name, url, tags, id) {
      return $http.post(apiURL + 'bookmarks/create', {name: name, url: url, tags: tags, user: id}).then(function(response) {
        if(response) {
          console.log(response.data);
          return response.data;
        }
      }, function(x) {
        alert(x.data.error);
      });
    },
    //API for searching bookmarks
    searchBookmark: function(url, tag, id) {
      return $http.post(url + 'bookmarks/search', {tag : tag, id: id}).then(function(response) {
        if(response) {
          console.log(response);
          return response.data;
        }
      }, function(x) {
        alert(x.data.error);
      });
    },
  }
});
