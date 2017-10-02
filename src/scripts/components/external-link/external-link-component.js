(function (){
  'use strict';

  function externalLinkController (routeService){
    const _public = this;

    const DEFAULT_ICON = 'ion-android-open';

    _public.$onInit = () => {
      setIcon(_public.icon);
    };

    _public.openUrl = () => {
      routeService.url(_public.url);
    };

    const setIcon = icon => {
      _public.icon = icon || DEFAULT_ICON;
    };
  }

  const externalLinkComponent = {
    templateUrl: '/components/external-link/external-link-template.html',
    controller: [
      'routeService',
      externalLinkController
    ],
    bindings: {
      icon: '@',
      text: '@',
      url: '@'
    }
  };

  angular.module('app').component('ngExternalLink', externalLinkComponent);

}());
