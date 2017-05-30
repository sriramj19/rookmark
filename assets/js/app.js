'use strict';

angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngStorage',
    'oc.lazyLoad'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/login'),
    $urlRouterProvider.otherwise('/login'),

    $stateProvider.state('base', {
        'abstract': !0,
        url: '',
        templateUrl: 'views/base.html'
    })
    .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'views/login.html',
        controller: function($localStorage, $state) {
          if($localStorage.userDetails) {
            $state.go('dashboard');
          }
        },
        resolve: { login: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/UsersController.js', 'js/services/Users.js']
          })
        }
      }
    })
    .state('dashboard', {
        url: '/dashboard',
        parent: 'base',
        templateUrl: 'views/dashboard.html',
        controller: function($localStorage, $state) {
          if(!$localStorage.userDetails) {
            $state.go('login');
          }
        },
        resolve: { dashboard: function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'app',
            files: ['js/controllers/BookmarksController.js', 'js/services/Bookmarks.js']
          })
        }
      }
    })
}]);
