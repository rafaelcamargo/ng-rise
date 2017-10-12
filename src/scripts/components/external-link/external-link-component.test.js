(function (){
  'use strict';

  describe('External Link', () => {
    const mock = angular.mock;
    let $componentController,
      routeService,
      controller,
      bindingsMock,
      instantiateController;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      routeService = $injector.get('routeService');
      $componentController = $injector.get('$componentController');

      bindingsMock = {
        text: 'Boleto',
        url: 'http://any.url.com'
      };

      instantiateController = bindings => {
        bindings = bindings || bindingsMock;
        controller = $componentController('nrExternalLink', {}, bindings);
      };

      spyOn(routeService, 'url');
    }));

    it('should set default icon when icon is not given', () => {
      instantiateController();
      controller.$onInit();
      expect(controller.icon).toEqual('ion-android-open');
    });

    it('should set custom icon when icon is given', () => {
      bindingsMock.icon = 'other_icon';
      instantiateController();
      controller.$onInit();
      expect(controller.icon).toEqual('other_icon');
    });

    it('should open external link', () => {
      instantiateController();
      controller.$onInit();
      controller.openUrl();
      expect(routeService.url).toHaveBeenCalledWith('http://any.url.com');
    });

  });

}());
