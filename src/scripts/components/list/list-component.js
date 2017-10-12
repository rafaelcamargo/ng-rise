(function (){
  'use strict';

  function listController(routeService){
    const _public = this;

    const QUERY_LIST_ERROR_MESSAGE = 'Não foi possível obter os itens.';
    const NO_DATA_FOUND_MESSAGE = 'Nenhum item encontrado.';
    const LIST_LOADING_CSS_CLASS = 'list-loading';

    _public.$onInit = () => {
      if(_public.bindCtrl)
        _public.ctrl = _public;
      if(hasFetchAction())
        _public.queryList();
      configFilter();
      configNewItemButtonVisibility();
      configListHeaderVisibility();
      configItemDividersCssClass();
      configFilterValue();
    };

    _public.queryList = () => {
      clearAlert();
      setLoaderVisibility(true);
      setLoadingCssClass(LIST_LOADING_CSS_CLASS);
      _public.fetch(getQueryParams()).$promise
        .then(onQueryListSuccess, onQueryListError);
    };

    _public.filter = () => {
      routeService.setSearchParams({
        [_public.filterSearchParam]: _public.filterValue,
        [_public.currentPageSearchParam]: '1'
      }).then(_public.queryList);
    };

    _public.onNewItemButtonClick = () => {
      _public.newItemButtonAction();
    };

    const hasFetchAction = () => {
      return _public.fetch;
    };

    const configFilter = () => {
      if(hasFilter()){
        setFilterVisibility(true);
        setFilterPlaceholder(_public.filterPlaceholder);
      }
    };

    const configNewItemButtonVisibility = () => {
      if(hasNewItemButton())
        setNewItemButtonVisibility(true);
    };

    const configListHeaderVisibility = () => {
      if(hasFilter() || hasNewItemButton())
        setListHeaderVisibility(true);
    };

    const hasFilter = () => {
      return _public.filterSearchParam;
    };

    const hasNewItemButton = () => {
      return _public.newItemButtonAction;
    };

    const getQueryParams = () => {
      const params = {};
      const filterValue = getRouteParam(_public.filterSearchParam);
      const currentPage = getRouteParam(_public.currentPageSearchParam);

      if (currentPage)
        params.currentPage = currentPage;
      if (filterValue)
        params[_public.filterBy] = filterValue;
      params.pageSize = _public.itemsPerPage || '10';
      return params;
    };

    const onQueryListSuccess = response => {
      const results = getQueryResults(response);
      onQueryListComplete();
      configBlankslate(results);
      setPagination(response.metadata);
      _public.fetchSuccess(results);
    };

    const getQueryResults = response => {
      if(response.data)
        return response.data;
      return response;
    };

    const configBlankslate = results => {
      if(!hasResults(results))
        setAlert('', NO_DATA_FOUND_MESSAGE);
    };

    const hasResults = results => {
      return results && results.length;
    };

    const onQueryListError = () => {
      onQueryListComplete();
      setAlert('error', QUERY_LIST_ERROR_MESSAGE, _public.queryList);
    };

    const onQueryListComplete = () => {
      setLoaderVisibility(false);
      setLoadingCssClass('');
    };

    const configItemDividersCssClass = () => {
      const cssClass = getItemDividersCssClass();
      setItemDividersCssClass(cssClass);
    };

    const configFilterValue = () => {
      const value = getRouteParam(_public.filterSearchParam);
      setFilterValue(value);
    };

    const getItemDividersCssClass = () => {
      if (_public.hideItemDividers)
        return 'list-item-dividers-hidden';
      return '';
    };

    const getRouteParam = param => {
      if(param)
        return routeService.getParams(param);
    };

    const setItemDividersCssClass = cssClass => {
      _public.itemDividersCssClass = cssClass;
    };

    const setLoadingCssClass = cssClass => {
      _public.loadingCssClass = cssClass;
    };

    const setLoaderVisibility = shouldShowLoader => {
      _public.shouldShowLoader = shouldShowLoader;
    };

    const setFilterValue = value => {
      _public.filterValue = value;
    };

    const setNewItemButtonVisibility = shouldShow => {
      _public.shouldShowNewItemButton = shouldShow;
    };

    const setFilterVisibility = shouldShow => {
      _public.shouldShowFilter = shouldShow;
    };

    const setFilterPlaceholder = placeholder => {
      _public.filterPlaceholder = _public.filterPlaceholder || 'Buscar';
    };

    const setListHeaderVisibility = shouldShow => {
      _public.shouldShowListHeader = shouldShow;
    };

    const clearAlert = () => {
      delete _public.alert;
    }

    const setAlert = (type, message, retryAction) => {
      _public.alert = {
        type,
        message,
        retryAction
      };
    }

    const setPagination = pagination => {
      _public.pagination = pagination;
    };
  }

  const listComponent = {
    templateUrl: '/base/components/list/list-template.html',
    transclude: true,
    controller: [
      'routeService',
      listController
    ],
    bindings: {
      itemsPerPage: '@',
      cssClass: '@',
      filterPlaceholder: '@',
      filterSearchParam: '@',
      filterBy: '@',
      currentPageSearchParam: '@',
      newItemButtonText: '@',
      newItemButtonAction: '<',
      hideItemDividers: '<',
      fetch: '<',
      fetchSuccess: '<',
      alert: '=',
      bindCtrl: '<',
      ctrl: '='
    }
  };

  angular.module('app').component('fkList', listComponent);

}());
