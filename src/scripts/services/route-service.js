(function (){
  'use strict';

  function routeService($window, $location, $state, $stateParams){

    const _public = {};

    _public.getRoutes = () => {
      return $state.get();
    };

    _public.isCurrentRoute = routeName => {
      return routeName === $state.current.name;
    };

    _public.includesRoute = routeName => {
      return $state.current.name.includes(routeName);
    };

    _public.go = (state, params, options) => {
      return $state.go(state, params, options);
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

    _public.setSearchParams = params => {
      return _public.go($state.current.name, params, {
        notify: false
      });
    };

    return _public;
  }

  angular.module('app').factory('routeService', [
    '$window',
    '$location',
    '$state',
    '$stateParams',
    routeService
  ]);

}());
