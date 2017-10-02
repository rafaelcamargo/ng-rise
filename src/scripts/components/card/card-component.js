(function (){
  'use strict';

  const cardComponent = {
    templateUrl: '/components/card/card-template.html',
    transclude: true,
    bindings: {
      icon: '@',
      title: '@'
    }
  };

  angular.module('app').component('ngCard', cardComponent);

}());
