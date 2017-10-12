(function (){
  'use strict';

  function appMenuController(routeService){
    const _public = this;

    _public.$onInit = () => {
      configMenuItems(routeService.getRoutes());
    };

    _public.onItemClick = item => {
      routeService.go(item.state);
    };

    const configMenuItems = routes => {
      const items = buildMenuItems(routes);
      setMenuItems(items);
    };

    const buildMenuItems = routes => {
      return routes
        .map(route => {
          if(route.appMenuItem)
            return {
              text: route.appMenuItem.text,
              state: route.name,
              selectedCssClass: getSelectedItemCssClass(route.name)
            };
          return null
        }).filter(route => {
          return route != null;
        });
    };

    const getSelectedItemCssClass = routeName => {
      return routeService.isCurrentRoute(routeName) ? 'app-menu-item-selected' : '';
    };

    const setMenuItems = items => {
      _public.items = items;
    };
  }

  const appMenuComponent = {
    templateUrl: '/components/app-menu/app-menu-template.html',
    transclude: true,
    controller: [
      'routeService',
      appMenuController
    ]
  };

  angular.module('app').component('nrAppMenu', appMenuComponent);

}());
