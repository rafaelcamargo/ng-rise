(function (){
  'use strict';

  describe('App Menu', () => {
    const mock = angular.mock;
    let $componentController,
      controller,
      routeService;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      routeService = $injector.get('routeService');
      $componentController = $injector.get('$componentController');

      controller = $componentController('ngAppMenu');

      spyOn(routeService, 'go');
      spyOn(routeService, 'isCurrentRoute').and.callFake(routeName => {
        return routeName == 'welcome'
      });
      spyOn(routeService, 'getRoutes').and.returnValue([{
        name: ''
      }, {
        name: 'welcome',
        appMenuItem: {
          text: 'Welcome'
        }
      }, {
        name: 'author',
        appMenuItem: {
          text: 'Author'
        }
      }]);
    }));

    it('should config items on initialization', () => {
      controller.$onInit();
      expect(controller.items).toEqual([{
        text: 'Welcome',
        state: 'welcome',
        selectedCssClass: 'app-menu-item-selected'
      }, {
        text: 'Author',
        state: 'author',
        selectedCssClass: ''
      }]);
    });

    it('should set item as selected when item route is the current route', () => {
      controller.$onInit();
      expect(controller.items[0].selectedCssClass).toEqual('app-menu-item-selected');
    });

    it('should not set item as selected when item route is not the current route', () => {
      controller.$onInit();
      expect(controller.items[1].selectedCssClass).toEqual('');
    });

    it('should go to the item route on item click', () => {
      controller.$onInit();
      controller.onItemClick(controller.items[1]);
      expect(routeService.go).toHaveBeenCalledWith('author');
    });

  });

}());
