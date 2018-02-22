(function (){
  'use strict';

  function appMenuController($rootScope, routeService){
    const _public = this;

    _public.$onInit = () => {
      configMenuItems();
    };

    _public.onItemClick = (item) => {
      if(item.nest)
        configSubItemsVisibility(item);
      if(!item.cancelNavigation){
        goToRoute(item.routeName);
        hideAllSubItems();
      }
    };

    _public.onSubItemClick = ($event, subItem) => {
      $event.stopImmediatePropagation();
      goToRoute(subItem.routeName);
      hideAllSubItems();
    };

    const configMenuItems = () => {
      const routes = getRoutes();
      const items = buildMenuItems(routes);
      setMenuItems(items);
      highlightCurrentRouteItems(items);
    };

    const buildMenuItems = routes => {
      const items = [];
      for(let i=0; i < routes.length; i++){
        const route = routes[i];
        if(isItemType(route, 'root'))
          items.push(buildItem(route, getSelectedRootItemCssClass));
        if(isItemType(route, 'nested'))
          configNestedItem(route, items);
      }
      return items;
    };

    const isItemType = (route, type) => {
      if(type == 'root')
        return route.appMenuItem && !route.appMenuItem.nested;;
      return route.appMenuItem && route.appMenuItem.nested;
    };

    const configNestedItem = (route, items) => {
      const parentItem = getParentItem(route.appMenuItem.parentName, items);
      const item = buildItem(route, getSelectedNestedItemCssClass);
      if(parentItem.nest)
        parentItem.nest.push(item);
      else
        parentItem.nest = [item];
    };

    const getParentItem = (routeName, items) => {
      return items.filter(item => {
        return item.routeName === routeName;
      })[0];
    }

    const buildItem = (route, getSelectedCssClass) => {
      const item = route.appMenuItem;
      item.routeName = route.name;
      return item;
    }

    const highlightCurrentRouteItems = allItems => {
      for(let i=0; i < allItems.length; i++){
        const rootItem = allItems[i];
        rootItem.selectedCssClass = getSelectedRootItemCssClass(rootItem.routeName);
        for(let j=0; rootItem.nest && j < rootItem.nest.length; j++){
          const nestedItem = rootItem.nest[j];
          nestedItem.selectedCssClass = getSelectedNestedItemCssClass(nestedItem.routeName);
        }
      }
    };

    const getSelectedRootItemCssClass = routeName => {
      return routeService.includesRoute(routeName) ? 'app-menu-item-selected' : '';
    };

    const getSelectedNestedItemCssClass = routeName => {
      return routeService.isCurrentRoute(routeName) ? 'app-menu-sub-item-selected' : '';
    };

    const setMenuItems = items => {
      _public.items = items;
    };

    const getRoutes = () => {
      return routeService.getRoutes();
    };

    const configSubItemsVisibility = parentItem => {
      setSubItemsVisibility(parentItem, !parentItem.shouldShowSubItems);
    };

    const hideAllSubItems = () => {
      for(var i=0; i < _public.items.length; i++)
        setSubItemsVisibility(_public.items[i], false);
    };

    const setSubItemsVisibility = (parentItem, shouldShowSubItems) => {
      parentItem.shouldShowSubItems = shouldShowSubItems;
    };

    const goToRoute = routeName => {
      routeService.go(routeName);
    };

    $rootScope.$on('$stateChangeSuccess', () => {
      highlightCurrentRouteItems(_public.items);
    });
  }

  const appMenuComponent = {
    templateUrl: '/components/app-menu/app-menu-template.html',
    controller: [
      '$rootScope',
      'routeService',
      appMenuController
    ]
  };

  angular.module('app').component('nrAppMenu', appMenuComponent);

}());
