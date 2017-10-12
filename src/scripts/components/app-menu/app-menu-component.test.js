(function (){
  'use strict';

  describe('App Menu', () => {
    const mock = angular.mock;
    let $componentController,
      $rootScope,
      controller,
      routeService,
      routesMock,
      stubRouteServiceMethod;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      $rootScope = $injector.get('$rootScope');
      routeService = $injector.get('routeService');
      $componentController = $injector.get('$componentController');

      controller = $componentController('nrAppMenu');

      routesMock = [{
        name: ''
      }, {
        name: 'accounts',
        appMenuItem: {
          text: 'Contas',
          cancelNavigation: true
        }
      }, {
        name: 'accounts.list',
        appMenuItem: {
          nested: true,
          parentName: 'accounts',
          text: 'Lista de Contas'
        }
      }, {
        name: 'accounts.migration',
        appMenuItem: {
          nested: true,
          parentName: 'accounts',
          text: 'Migração de Contas'
        }
      }, {
        name: 'coupons',
        appMenuItem: {
          text: 'Cupons'
        }
      }, {
        name: 'coupons.list',
        appMenuItem: {
          nested: true,
          parentName: 'coupons',
          text: 'Lista de Cupons'
        }
      }];

      stubRouteServiceMethod = (method, mockedRouteName) => {
        spyOn(routeService, method).and.callFake(routeName => {
          return routeName == mockedRouteName
        });
      };

      spyOn(routeService, 'go');
      spyOn(routeService, 'getRoutes').and.returnValue(routesMock);
    }));

    it('should config items on initialization', () => {
      stubRouteServiceMethod('includesRoute', 'accounts');
      controller.$onInit();
      expect(controller.items).toEqual([{
        text: 'Contas',
        routeName: 'accounts',
        selectedCssClass: 'app-menu-item-selected',
        cancelNavigation: true,
        nest: [{
          nested: true,
          parentName: 'accounts',
          text: 'Lista de Contas',
          routeName: 'accounts.list',
          selectedCssClass: ''
        }, {
          nested: true,
          parentName: 'accounts',
          text: 'Migração de Contas',
          routeName: 'accounts.migration',
          selectedCssClass: ''
        }]
      }, {
        text: 'Cupons',
        routeName: 'coupons',
        selectedCssClass: '',
        nest: [{
          nested: true,
          parentName: 'coupons',
          text: 'Lista de Cupons',
          routeName: 'coupons.list',
          selectedCssClass: ''
        }]
      }]);
    });

    it('should set item as selected when item route includes the current route', () => {
      stubRouteServiceMethod('includesRoute', 'accounts');
      controller.$onInit();
      expect(controller.items[0].selectedCssClass).toEqual('app-menu-item-selected');
    });

    it('should not set item as selected when item route is not the current route', () => {
      stubRouteServiceMethod('includesRoute', 'accounts');
      controller.$onInit();
      expect(controller.items[1].selectedCssClass).toEqual('');
    });

    it('should go to the item route on item click', () => {
      controller.$onInit();
      controller.onItemClick(controller.items[1]);
      expect(routeService.go).toHaveBeenCalledWith('coupons');
    });

    it('should not go to the item route on item click when item cancels navigation', () => {
      controller.$onInit();
      controller.onItemClick(controller.items[0]);
      expect(routeService.go).not.toHaveBeenCalled();
    });

    it('should set nested item as selected when nested item route is the current rout', () => {
      stubRouteServiceMethod('isCurrentRoute', 'accounts.list');
      controller.$onInit();
      expect(controller.items[0].nest[0].selectedCssClass).toEqual('app-menu-sub-item-selected');
    });

    it('should update selected items on route change success', () => {
      stubRouteServiceMethod('includesRoute', 'accounts');
      controller.$onInit();
      expect(controller.items[1].nest[0].selectedCssClass).toEqual('');
      stubRouteServiceMethod('isCurrentRoute', 'coupons.list');
      $rootScope.$broadcast('$stateChangeSuccess', controller.items);
      expect(controller.items[1].nest[0].selectedCssClass).toEqual('app-menu-sub-item-selected');
    });

  });

}());
