(function (){
  'use strict';

  describe('List', () => {
    const mock = angular.mock;
    let $componentController,
      controller,
      routeService,
      instantiateController,
      bindingsMock,
      routeParamsMock,
      stubFetchAction,
      mockFetchResponse;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      routeService = $injector.get('routeService');
      $componentController = $injector.get('$componentController');

      mockFetchResponse = {
        data: [{some: 'object'}, {another: 'object'}],
        metadata: {
          currentPage: 1,
          pageSize: 10,
          total: 2
        }
      };

      routeParamsMock = {};

      bindingsMock = {
        fetch: function(){},
        fetchSuccess: function(){},
        newItemButtonText: 'New Item',
        newItemButtonAction: function(){},
        filterBy: 'code',
        filterSearchParam: 'couponListCode',
        currentPageSearchParam: 'couponListCurrentPage'
      };

      instantiateController = bindings => {
        bindings = bindings || bindingsMock;
        controller = $componentController('fkList', {}, bindings);
      };

      stubFetchAction = (responseType, response, shouldAbort) => {
        response = response || mockFetchResponse;
        spyOn(bindingsMock, 'fetch').and.returnValue({
          $promise: {
            then: (successCallback, errorCallback) => {
              if(responseType == 'success' && !shouldAbort)
                successCallback(response);
              else if(responseType == 'error' && !shouldAbort)
                errorCallback(response);
            }
          }
        });
      };
      spyOn(routeService, 'getParams').and.callFake(param => {
        return routeParamsMock[param];
      });
      spyOn(routeService, 'setSearchParams').and.callFake(params => {
        for(let param in params)
          routeParamsMock[param] = params[param];
        return {
          then: successCallback => {
            successCallback();
          }
        }
      });
      spyOn(bindingsMock, 'fetchSuccess');
      spyOn(bindingsMock, 'newItemButtonAction');
    }));

    it('should not expose controller to the parent component if not required', () => {
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.ctrl).toEqual(undefined);
    });

    it('should expose controller to the parent component if required', () => {
      bindingsMock.bindCtrl = true;
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.ctrl).toEqual(controller);
    });

    it('should show item dividers by default', () => {
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.itemDividersCssClass).toEqual('');
    });

    it('should optionally hide item dividers', () => {
      stubFetchAction('success');
      bindingsMock.hideItemDividers = true;
      instantiateController();
      controller.$onInit();
      expect(controller.itemDividersCssClass).toEqual('list-item-dividers-hidden');
    });

    it('should fetch items on component initialization if fetch action is provided', () => {
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.fetch).toHaveBeenCalledWith({
        pageSize: '10'
      });
    });

    it('should fetch items on component initialization customizing items per page', () => {
      bindingsMock.itemsPerPage = '20';
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.fetch).toHaveBeenCalledWith({
        pageSize: '20'
      });
    });

    it('should fetch items on component initialization with the search params found on url', () => {
      routeParamsMock.couponListCode = 'PROMO30';
      routeParamsMock.couponListCurrentPage = '3';
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.fetch).toHaveBeenCalledWith({
        code: 'PROMO30',
        currentPage: '3',
        pageSize: '10'
      });
    });

    it('should not fetch items on component initialization if no fetch action is provided', () => {
      delete bindingsMock.fetch;
      instantiateController();
      spyOn(controller, 'queryList');
      controller.$onInit();
      expect(controller.queryList).not.toHaveBeenCalled();
    });

    it('should show new item button on component initialization if new item button is provided', () => {
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.shouldShowNewItemButton).toEqual(true);
    });

    it('should not show new item button on component initialization if no new item button is provided', () => {
      delete bindingsMock.newItemButtonText;
      delete bindingsMock.newItemButtonAction;
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.shouldShowNewItemButton).toEqual(undefined);
    });

    it('should show filter on component initialization if filter is provided', () => {
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.shouldShowFilter).toEqual(true);
    });

    it('should not show filter on component initialization if no filter is provided', () => {
      delete bindingsMock.filterSearchParam;
      delete bindingsMock.filterBy;
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.shouldShowFilter).toEqual(undefined);
    });

    it('should set custom filter placeholder', () => {
      bindingsMock.filterPlaceholder = 'Filter something';
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.filterPlaceholder).toEqual('Filter something');
    });

    it('should set default filter placeholder if no custom one is provided', () => {
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.filterPlaceholder).toEqual('Buscar');
    });

    it('should set filter value on initialization with the value found on url search params', () => {
      routeParamsMock.couponListCode = 'PROMO30';
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.filterValue).toEqual('PROMO30');
    });

    it('should not set filter value on initialization if no value is found on url search params', () => {
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.filterValue).toEqual(undefined);
    });

    it('shoud show list header if new item button is provided', () => {
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.shouldShowListHeader).toEqual(true);
    });

    it('should show list header if filter is provided', () => {
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.shouldShowListHeader).toEqual(true);
    });

    it('should hide list header if no new item button or filter are provided', () => {
      delete bindingsMock.newItemButtonText;
      delete bindingsMock.newItemButtonAction;
      delete bindingsMock.filterBy;
      delete bindingsMock.filterSearchParam;
      stubFetchAction('success');
      instantiateController();
      controller.$onInit();
      expect(controller.shouldShowListHeader).toEqual(undefined);
    });

    it('should filter items', () => {
      stubFetchAction('success');
      instantiateController();
      controller.filterValue = 'XMAS75';
      controller.filter();
      expect(controller.fetch).toHaveBeenCalledWith({
        code: 'XMAS75',
        currentPage: '1',
        pageSize: '10'
      });
    });

    it('should set search params on url on filter', () => {
      stubFetchAction('success');
      instantiateController();
      controller.filterValue = 'XMAS75';
      controller.filter();
      expect(routeService.setSearchParams).toHaveBeenCalledWith({
        couponListCode: 'XMAS75',
        couponListCurrentPage: '1'
      });
    });

    it('should reset current page to 1 on filter', () => {
      stubFetchAction('success');
      instantiateController();
      controller.filter();
      expect(routeService.setSearchParams).toHaveBeenCalledWith(jasmine.objectContaining({
        couponListCurrentPage: '1'
      }));
    });

    it('should clear any alert before fetch items', () => {
      stubFetchAction('success', {}, true);
      instantiateController();
      controller.alert = {some: 'alert'};
      controller.queryList();
      expect(controller.alert).toEqual(undefined);
    });

    it('should show loader while fetching items', () => {
      stubFetchAction('success', {}, true);
      instantiateController();
      controller.queryList();
      expect(controller.shouldShowLoader).toEqual(true);
    });

    it('should set loading css class while loading', () => {
      stubFetchAction('success', {}, true);
      instantiateController();
      controller.queryList();
      expect(controller.loadingCssClass).toEqual('list-loading');
    });

    it('should hide loader on fetch complete', () => {
      stubFetchAction('success');
      instantiateController();
      controller.queryList();
      expect(controller.shouldShowLoader).toEqual(false);
    });

    it('should set pagination on fetch success', () => {
      stubFetchAction('success');
      instantiateController();
      controller.queryList();
      expect(controller.pagination).toEqual(mockFetchResponse.metadata);
    });

    it('should call fetch success custom action with result as object', () => {
      stubFetchAction('success');
      instantiateController();
      controller.queryList();
      expect(controller.fetchSuccess).toHaveBeenCalledWith(jasmine.any(Object));
    });

    it('should call fetch success custom action with result as array', () => {
      stubFetchAction('success', [{some: 'object'}, {another: 'object'}]);
      instantiateController();
      controller.queryList();
      expect(controller.fetchSuccess).toHaveBeenCalledWith(jasmine.any(Array));
    });

    it('should show no data found message', () => {
      mockFetchResponse.data = [];
      stubFetchAction('success');
      instantiateController();
      controller.queryList();
      expect(controller.alert).toEqual({
        type: '',
        message: 'Nenhum item encontrado.',
        retryAction: undefined
      });
    });

    it('should show query list error message on fetch error', () => {
      stubFetchAction('error');
      instantiateController();
      controller.queryList();
      expect(controller.alert).toEqual({
        type: 'error',
        message: 'Não foi possível obter os itens.',
        retryAction: controller.queryList
      });
    });

    it('should call new item button action on new item button click', () => {
      instantiateController();
      controller.onNewItemButtonClick();
      expect(controller.newItemButtonAction).toHaveBeenCalled();
    });
  });

}());
