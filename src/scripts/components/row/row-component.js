(function (){
  'use strict';

  const rowComponent = {
    templateUrl: '/components/row/row-template.html',
    transclude: true,
    bindings: {
      cssClass: '@'
    }
  };

  angular.module('app').component('nrRow', rowComponent);

}());
