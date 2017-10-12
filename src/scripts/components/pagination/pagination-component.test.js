(function (){
  'use strict';

  describe('Pagination', () => {
    const mock = angular.mock;
    let $componentController,
      routeService,
      bindingsMock,
      controller,
      instantiateController;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      routeService = $injector.get('routeService');
      $componentController = $injector.get('$componentController');

      bindingsMock = {
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 123
        },
        currentPageSearchParam: 'currentPage',
        queryAction: () => {}
      };

      instantiateController = bindings => {
        bindings = bindings || bindingsMock;
        controller = $componentController('nrPagination', {}, bindings);
      };

      spyOn(routeService, 'setSearchParams').and.returnValue({
        then: successCallback => {
          successCallback();
        }
      });
      spyOn(bindingsMock, 'queryAction');
    }));

    it('should show pagination when it has more than one page', () => {
      instantiateController();
      controller.$onInit();
      expect(controller.shouldShowPagination).toEqual(true);
    });

    it('should hide pagination when it has just one page', () => {
      bindingsMock.pagination = {
        currentPage: 1,
        pageSize: 10,
        total: 9
      };
      instantiateController(bindingsMock);
      controller.$onInit();
      expect(controller.shouldShowPagination).toEqual(false);
    });

    it('should disable previous page button when current page is the first one', () => {
      bindingsMock.pagination = {
        currentPage: 1,
        pageSize: 10,
        total: 123
      };
      instantiateController(bindingsMock);
      controller.$onInit();
      expect(controller.shouldDisablePreviousButton).toEqual(true);
    });

    it('should enable previous page button when current page is not the first one', () => {
      bindingsMock.pagination = {
        currentPage: 7,
        pageSize: 10,
        total: 123
      };
      instantiateController(bindingsMock);
      controller.$onInit();
      expect(controller.shouldDisablePreviousButton).toEqual(false);
    });

    it('should disable next page button when current page is the last one', () => {
      bindingsMock.pagination = {
        currentPage: 3,
        pageSize: 10,
        total: 26
      };
      instantiateController(bindingsMock);
      controller.$onInit();
      expect(controller.shouldDisableNextButton).toEqual(true);
    });

    it('should enable next page button when current page is not the last one', () => {
      bindingsMock.pagination = {
        currentPage: 2,
        pageSize: 10,
        total: 26
      };
      instantiateController(bindingsMock);
      controller.$onInit();
      expect(controller.shouldDisableNextButton).toEqual(false);
    });

    it('should go to the previous page', () => {
      bindingsMock.pagination = {
        currentPage: 2,
        pageSize: 10,
        total: 26
      };
      instantiateController(bindingsMock);
      controller.$onInit();
      controller.querySiblingPage('previous');
      expect(routeService.setSearchParams).toHaveBeenCalledWith({
        [controller.currentPageSearchParam]: 1
      });
    });

    it('should go to the next page', () => {
      bindingsMock.pagination = {
        currentPage: 2,
        pageSize: 10,
        total: 26
      };
      instantiateController(bindingsMock);
      controller.$onInit();
      controller.querySiblingPage('next');
      expect(routeService.setSearchParams).toHaveBeenCalledWith({
        [controller.currentPageSearchParam]: 3
      });
    });

    it('should go to the specific page', () => {
      instantiateController();
      controller.$onInit();
      controller.queryPage(5);
      expect(routeService.setSearchParams).toHaveBeenCalledWith({
        [controller.currentPageSearchParam]: 5
      });
    });

    it('should call query action after query another page', () => {
      instantiateController();
      controller.$onInit();
      controller.queryPage(2);
      expect(controller.queryAction).toHaveBeenCalled();
    });

    it('should config the number of total pages if on pagination binding change', () => {
      bindingsMock.pagination = {
        currentPage: 2,
        pageSize: 10,
        total: 26
      };
      instantiateController(bindingsMock);
      controller.pagination = {
        currentPage: 1,
        pageSize: 10,
        total: 9
      }
      controller.$onChanges();
      expect(controller.numOfTotalPages).toEqual(1);
    });

    it('should config the pagination visibility on pagination binding change', () => {
      bindingsMock.pagination = {
        currentPage: 2,
        pageSize: 10,
        total: 26
      };
      instantiateController(bindingsMock);
      controller.pagination = {
        currentPage: 1,
        pageSize: 10,
        total: 9
      }
      controller.$onChanges();
      expect(controller.shouldShowPagination).toEqual(false);
    });

    it('should config the previous page button ability on pagination binding change', () => {
      bindingsMock.pagination = {
        currentPage: 1,
        pageSize: 10,
        total: 26
      };
      instantiateController(bindingsMock);
      controller.pagination = {
        currentPage: 2,
        pageSize: 10,
        total: 26
      }
      controller.$onChanges();
      expect(controller.shouldDisablePreviousButton).toEqual(false);
    });

    it('should config the next page button ability on pagination binding change', () => {
      bindingsMock.pagination = {
        currentPage: 3,
        pageSize: 10,
        total: 26
      };
      instantiateController(bindingsMock);
      controller.pagination = {
        currentPage: 1,
        pageSize: 10,
        total: 26
      }
      controller.$onChanges();
      expect(controller.shouldDisableNextButton).toEqual(false);
    });
  });

}());
