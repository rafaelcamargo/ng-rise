(function (){
  'use strict';

  const socialNetworksComponent = {
    templateUrl: '/components/social-networks/social-networks-template.html',
    bindings: {
      networks: '<'
    }
  };

  angular.module('app').component('nrSocialNetworks', socialNetworksComponent);

}());
