(function (){
  'use strict';

  const iconComponent = {
    templateUrl: '/components/icon/icon-template.html',
    transclude: true,
    bindings: {
      icon: '@'
    }
  };

  angular.module('app').component('ngIcon', iconComponent);

}());
