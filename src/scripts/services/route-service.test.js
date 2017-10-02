(function (){
  'use strict';

  describe('Route Service', () => {
    const mock = angular.mock;
    let $window,
      $location,
      $state,
      $stateParams,
      routeService;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      $window = $injector.get('$window');
      $location = $injector.get('$location');
      $state = $injector.get('$state');
      $stateParams = $injector.get('$stateParams');
      routeService = $injector.get('routeService');

      $state.current.name = 'app.testing';

      spyOn($window, 'open');
      spyOn($location, 'absUrl');
      spyOn($state, 'reload');
      spyOn($state, 'go');
      spyOn($state, 'get');
    }));

    it('should get routes', () => {
      routeService.getRoutes();
      expect($state.get).toHaveBeenCalled();
    });

    it('should answer if some route is the current route by its name', () => {
      $state.current = {
        name: 'welcome'
      };
      expect(routeService.isCurrentRoute('welcome')).toEqual(true);
      expect(routeService.isCurrentRoute('author')).toEqual(false);
    });

    it('should go to a specific state', () => {
      const state = 'some.state';
      const params = {some: 'param'};

      routeService.go(state, params);
      expect($state.go).toHaveBeenCalledWith(state, params);
    });

    it('should get url', () => {
      routeService.url();
      expect($location.absUrl).toHaveBeenCalled();
    });

    it('should set url', () => {
      const url = 'http://contaazul.com';

      routeService.url(url);
      expect($window.open).toHaveBeenCalledWith(url);
    });

    it('should set search params', () => {
      routeService.setSearchParams({
        name: 'rafael',
        email: 'some@email.com'
      });
      expect($stateParams.name).toEqual('rafael');
      expect($stateParams.email).toEqual('some@email.com');
      expect($state.reload).toHaveBeenCalled();
    });

    it('should get all route params', () => {
      $stateParams.name = 'rafael';
      $stateParams.email = 'some@email.com';

      const params = routeService.getParams();

      expect(params).toEqual({
        name: 'rafael',
        email: 'some@email.com'
      });
    });

    it('should get specific route param', () => {
      $stateParams.name = 'rafael';
      $stateParams.email = 'some@email.com';

      const params = routeService.getParams('name');

      expect(params).toEqual('rafael');
    });

  });

}());
