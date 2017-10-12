(function (){
  'use strict';

  function paginationController (routeService){
    const _public = this;

    _public.$onInit = () => {
      configPagination();
    };

    _public.$onChanges = () => {
      configPagination();
    };

    _public.querySiblingPage = type => {
      let pageNumber = _public.pagination.currentPage;

      if (type == 'previous')
        _public.queryPage(--pageNumber);
      else
        _public.queryPage(++pageNumber);
    };

    _public.queryPage = pageNumber => {
      routeService.setSearchParams({
        [_public.currentPageSearchParam]: pageNumber
      }).then(() => {
        _public.queryAction();
      });
    };

    const configPagination = () => {
      configNumOfTotalPages();
      configPaginationVisibility();
      configPaginationLinksVisibility();
    };

    const configNumOfTotalPages = () => {
      const numOfTotalPages = getNumOfTotalPages();
      setNumOfTotalPages(numOfTotalPages);
    };

    const getNumOfTotalPages = () => {
      return _public.pagination.total / _public.pagination.pageSize;
    };

    const setNumOfTotalPages = numOfTotalPages => {
      _public.numOfTotalPages = Math.ceil(numOfTotalPages);
    };

    const configPaginationVisibility = () => {
      _public.shouldShowPagination = hasMoreThanOnePage();
    };

    const configPaginationLinksVisibility = () => {
      const currentPage = _public.pagination.currentPage;

      _public.shouldDisablePreviousButton = !hasPreviousPage(currentPage);
      _public.shouldDisableNextButton = !hasNextPage(currentPage);
    };

    const hasMoreThanOnePage = () => {
      return _public.numOfTotalPages > 1;
    };

    const hasPreviousPage = currentPage => {
      return currentPage !== 1;
    };

    const hasNextPage = currentPage => {
      return currentPage !== _public.numOfTotalPages;
    };
  }

  const paginationComponent = {
    templateUrl: '/components/pagination/pagination-template.html',
    controller: [
      'routeService',
      paginationController
    ],
    bindings: {
      pagination: '<',
      currentPageSearchParam: '<',
      queryAction: '='
    }
  };

  angular.module('app').component('nrPagination', paginationComponent);

}());
