(function () {
  'use strict';

  function configRoutes ($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('welcome', {
        url: '/',
        templateUrl: '/views/welcome/welcome-template.html',
        appMenuItem: {
          text: 'Welcome'
        }
      })
      .state('author', {
        url: '/author',
        templateUrl: '/views/author/author-template.html',
        appMenuItem: {
          text: 'Author'
        }
      });

    $urlRouterProvider.otherwise('/');

  };

  angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    configRoutes
  ]);

}());
