(function (){
  'use strict';

  const listItemComponent = {
    templateUrl: '/components/list-item/list-item-template.html',
    transclude: true,
    bindings: {
      cssClass: '@'
    }
  };

  angular.module('app').component('nrListItem', listItemComponent);

}());
