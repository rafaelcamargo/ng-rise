(function (){
  'use strict';

  function rowItemController(){
    const _public = this;

    _public.$onInit = () => {
      setRowItemSize(_public.size);
    }

    const setRowItemSize = size => {
      _public.sizeCssClass = size ? `row-item-size-${size}` : '';
    };
  }

  const rowItemComponent = {
    templateUrl: '/components/row-item/row-item-template.html',
    transclude: true,
    controller: rowItemController,
    bindings: {
      label: '@',
      cssClass: '@',
      value: '<',
      size: '<'
    }
  };

  angular.module('app').component('nrRowItem', rowItemComponent);

}());
