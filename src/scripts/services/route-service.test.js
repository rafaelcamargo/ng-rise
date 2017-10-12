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

    it('should get all routes', () => {
      routeService.getRoutes();
      expect($state.get).toHaveBeenCalled();
    });

    it('should check if some route name includes a parent route name', () => {
      const parentRouteName = 'app.accounts';
      const notParentRouteName = 'app.coupons';
      $state.current.name = 'app.accounts.list';
      expect(routeService.includesRoute(parentRouteName)).toEqual(true);
      expect(routeService.includesRoute(notParentRouteName)).toEqual(false);
    });

    it('shold check if route is the current one', () => {
      const currentRouteName = 'app.accounts.list';
      const notCurrentRouteName = 'app.coupons';
      $state.current.name = currentRouteName;
      expect(routeService.isCurrentRoute(currentRouteName)).toEqual(true);
      expect(routeService.isCurrentRoute(notCurrentRouteName)).toEqual(false);
    });

    it('should go to a specific state', () => {
      const state = 'some.state';

      routeService.go(state);
      expect($state.go).toHaveBeenCalledWith(state, undefined, undefined);
    });

    it('should go to a specific state passing params', () => {
      const state = 'some.state';
      const params = {some: 'param'};

      routeService.go(state, params);
      expect($state.go).toHaveBeenCalledWith(state, params, undefined);
    });

    it('should go to a specific state passing options', () => {
      const state = 'some.state';
      const options = {some: 'option'};

      routeService.go(state, null, options);
      expect($state.go).toHaveBeenCalledWith(state, null, options);
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
      const params = {
        name: 'rafael',
        email: 'some@email.com'
      };
      $state.current.name = 'account';
      routeService.setSearchParams(params);
      expect($state.go).toHaveBeenCalledWith($state.current.name, params, {
        notify: false
      });
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
