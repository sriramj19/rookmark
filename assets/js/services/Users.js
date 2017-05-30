'user strict';

var app = angular.module('app');
/* Users Service */

app.factory('UsersService', function($http) {
  return {
    signin: function(url, email, password) {
      return $http.post(url + 'users/signin', {emailAddress: email, password: password}).then(function(response) {
        if(response) {
          return response;
        }
      }, function(x) {
        alert(x.data.error);
      });
    },
    signup: function(url, email, password) {
      return $http.post(url + 'users/signup', {emailAddress: email, password: password}).then(function(response) {
        if(response) {
          return response;
        }
      }, function(x) {
        alert(x.data.error);
      });
    },
  }
});
