(function (){
  'use strict';

  function alertController (){
    const _public = this;

    _public.retry = () => {
      _public.alert.retryAction();
      delete _public.alert;
    };

    _public.customAction = () => {
      _public.alert.customButton.action();
    };
  }

  const alertComponent = {
    templateUrl: '/components/alert/alert-template.html',
    transclude: true,
    controller: alertController,
    bindings: {
      alert: '=',
      cssClass: '@'
    }
  };

  angular.module('app').component('ngAlert', alertComponent);

}());
