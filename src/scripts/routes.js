(function () {
  'use strict';

  function configRoutes ($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('welcome', {
        url: '/',
        templateUrl: '/views/welcome/welcome-template.html',
        appMenuItem: {
          text: 'Welcome',
          icon: 'ion-home'
        }
      })
      .state('author', {
        url: '/author',
        templateUrl: '/views/author/author-template.html',
        appMenuItem: {
          text: 'Author',
          icon: 'ion-person'
        }
      })
      .state('feedback', {
        url: '/feedback',
        templateUrl: '/views/feedback/feedback-template.html',
        appMenuItem: {
          text: 'Feedback',
          icon: 'ion-ios-chatbubble'
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
