(function (){
  'use strict';

  function authorSocialNetworksController(){
    const _public = this;

    const NETWORKS = [{
      icon: 'ion-social-octocat',
      url: 'https://github.com/rafaelcamargo'
    }, {
      icon: 'ion-social-dribbble-outline',
      url: 'https://dribbble.com/rcamargo'
    }, {
      icon: 'ion-social-twitter',
      url: 'https://twitter.com/rcamargo'
    }];

    _public.$onInit = () => {
      setNetworks(NETWORKS);
    };

    const setNetworks = networks => {
      _public.networks = networks;
    };
  }

  const authorSocialNetworksComponent = {
    templateUrl: '/components/author-social-networks/author-social-networks-template.html',
    controller: authorSocialNetworksController
  };

  angular.module('app').component('nrAuthorSocialNetworks', authorSocialNetworksComponent);

}());
