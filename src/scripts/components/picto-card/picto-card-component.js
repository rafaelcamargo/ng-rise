(function (){
  'use strict';

  const pictoCardComponent = {
    templateUrl: '/components/picto-card/picto-card-template.html',
    transclude: true,
    bindings: {
      icon: '@',
      title: '@'
    }
  };

  angular.module('app').component('ngPictoCard', pictoCardComponent);

}());
