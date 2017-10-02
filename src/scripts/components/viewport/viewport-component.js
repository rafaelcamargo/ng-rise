(function (){
  'use strict';

  const viewportComponent = {
    templateUrl: '/components/viewport/viewport-template.html',
    transclude: true
  };

  angular.module('app').component('ngViewport', viewportComponent);

}());
