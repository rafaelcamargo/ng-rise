(function (){
  'use strict';

  const routeService = ($window, $location, $state, $stateParams) => {

    const _public = {};

    _public.getRoutes = () => {
      return $state.get();
    };

    _public.isCurrentRoute = routeName => {
      return routeName === $state.current.name;
    };

    _public.go = (state, params) => {
      $state.go(state, params);
    };

    _public.url = url => {
      if (url)
        $window.open(url);
      else
        return $location.absUrl();
    };

    _public.getParams = param => {
      if (param)
        return $stateParams[param];
      return $stateParams;
    };

    _public.setSearchParams = (params, avoidStateReload) => {
      for (const property in params)
        $stateParams[property] = params[property];
      $state.reload();
    };

    return _public;
  };

  angular.module('app').factory('routeService', [
    '$window',
    '$location',
    '$state',
    '$stateParams',
    routeService
  ]);

}());
