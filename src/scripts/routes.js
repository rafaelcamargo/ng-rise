(function () {
  'use strict';

  function configRoutes ($stateProvider, $urlRouterProvider){

    $stateProvider.state('welcome', {
      url: '/',
      templateUrl: '/views/welcome/welcome-template.html'
    });

    $urlRouterProvider.otherwise('/');

  };

  angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    configRoutes
  ]);

}());
