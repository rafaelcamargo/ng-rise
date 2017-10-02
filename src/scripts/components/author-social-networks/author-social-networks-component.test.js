(function (){
  'use strict';

  describe('Author Social Networks', () => {
    const mock = angular.mock;
    let $componentController,
      controller;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      $componentController = $injector.get('$componentController');

      controller = $componentController('ngAuthorSocialNetworks');
    }));

    it('should set author social networks', () => {
      controller.$onInit();
      expect(controller.networks).toEqual([{
        icon: 'ion-social-octocat',
        url: 'https://github.com/rafaelcamargo'
      }, {
        icon: 'ion-social-dribbble-outline',
        url: 'https://dribbble.com/rcamargo'
      }, {
        icon: 'ion-social-twitter',
        url: 'https://twitter.com/rcamargo'
      }]);
    });

  });

}());
