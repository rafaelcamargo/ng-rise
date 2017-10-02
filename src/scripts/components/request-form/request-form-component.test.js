(function (){
  'use strict';

  describe('Request Form', () => {
    const mock = angular.mock;
    const functionMock = () => {};
    const responseMock = {
      success: {
        value: 'success'
      },
      error: {
        value: 'error'
      }
    };

    let $componentController,
      $rootScope,
      $scope,
      instatiateController,
      controller,
      bindingsMock,
      stubFormAction,
      bindFetchActions,
      formModelMock;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $componentController = $injector.get('$componentController');

      formModelMock = {
        $error: {
          required: [{
            $setDirty (){}
          }]
        },
        $setPristine: () => {},
        $setUntouched: () => {},
      };

      bindingsMock = {
        submit: functionMock,
        submitSuccess: functionMock,
        submitError: functionMock,
        alert: null,
        name: 'testingForm'
      };

      $scope[bindingsMock.name] = formModelMock;

      bindFetchActions = () => {
        bindingsMock.fetch = functionMock;
        bindingsMock.fetchSuccess = functionMock;
        bindingsMock.fetchError = functionMock;
      };

      instatiateController = bindings => {
        bindings = bindings || bindingsMock;
        controller = $componentController('ngRequestForm', {
          $scope
        }, bindings);
      };

      stubFormAction = (action, responseType, shouldAbortCallbacks, shouldReturnPromise) => {
        if (shouldReturnPromise)
          spyOn(controller, action).and.returnValue({
            $promise: {
              then (successCallback, errorCallback){
                if (!shouldAbortCallbacks && responseType == 'success')
                  successCallback(responseMock.success);
                else if (!shouldAbortCallbacks)
                  errorCallback(responseMock.error);
              }
            }
          });
        else
          spyOn(controller, action);
      };

      spyOn($scope[bindingsMock.name].$error.required[0], '$setDirty');
      spyOn($scope[bindingsMock.name], '$setPristine');
      spyOn($scope[bindingsMock.name], '$setUntouched');
    }));

    it('should clear any alert on form submit', () => {
      instatiateController();
      stubFormAction('submit', 'success', false, true);
      controller.sendData();
      expect(controller.alert).toEqual(null);
    });

    it('should set loader css class on form submit', () => {
      instatiateController();
      stubFormAction('submit', 'success', true, true);
      controller.sendData();
      expect(controller.loaderCssClass).toEqual('request-form-loading');
    });

    it('should clear loader css class when form submit completes', () => {
      instatiateController();
      stubFormAction('submit', 'success', false, true);
      controller.sendData();
      expect(controller.loaderCssClass).toEqual('');
    });

    it('should call submit bound action on form submit', () => {
      instatiateController();
      stubFormAction('submit', 'success', false, true);
      controller.sendData();
      expect(controller.submit).toHaveBeenCalled();
    });

    it('should call success callback on form submit success', () => {
      instatiateController();
      stubFormAction('submit', 'success', false, true);
      spyOn(controller, 'submitSuccess');
      controller.sendData();
      expect(controller.submitSuccess).toHaveBeenCalledWith({
        value: 'success'
      });
    });

    it('should call error callback on form submit error', () => {
      instatiateController();
      stubFormAction('submit', 'error', false, true);
      spyOn(controller, 'submitError');
      controller.sendData();
      expect(controller.submitError).toHaveBeenCalledWith({
        value: 'error'
      });
    });

    it('should not call fetch bound action on initialization if it was not provided', () => {
      instatiateController();
      spyOn(controller, 'fetchData');
      controller.$onInit();
      expect(controller.fetchData).not.toHaveBeenCalled();
    });

    it('should call fetch bound action on initialization if it was provided', () => {
      bindFetchActions();
      instatiateController();
      stubFormAction('fetch', 'success', false, true);
      controller.$onInit();
      expect(controller.fetch).toHaveBeenCalled();
    });

    it('should call success callback on form fetch success', () => {
      bindFetchActions();
      instatiateController();
      stubFormAction('fetch', 'success', false, true);
      spyOn(controller, 'fetchSuccess');
      controller.$onInit();
      expect(controller.fetchSuccess).toHaveBeenCalledWith({
        value: 'success'
      });
    });

    it('should call error callback on form fetch error', () => {
      bindFetchActions();
      instatiateController();
      stubFormAction('fetch', 'error', false, true);
      spyOn(controller, 'fetchError');
      controller.$onInit();
      expect(controller.fetchError).toHaveBeenCalledWith({
        value: 'error'
      });
    });

    it('should not clear alert when request is not sent on form submit', () => {
      const mockAlert = {
        type: 'error',
        message: 'any message'
      };

      instatiateController();
      stubFormAction('submit', null, false, false);
      controller.alert = mockAlert;
      controller.sendData();
      expect(controller.alert).toEqual(mockAlert);
    });

    it('should not set loader css class when request is not sent on form submit', () => {
      instatiateController();
      stubFormAction('submit', null, false, false);
      controller.sendData();
      expect(controller.loaderCssClass).toEqual(undefined);
    });

    it('should bind form controller on initialization', () => {
      bindingsMock.bindCtrl = true;
      bindingsMock.ctrl = null;
      instatiateController(bindingsMock);
      controller.$onInit();
      expect(controller.ctrl.sendData).toBeDefined();
      expect(controller.ctrl.fetchData).toBeDefined();
    });

    it('should not bind form controller on initialization', () => {
      instatiateController(bindingsMock);
      controller.$onInit();
      expect(controller.formCtrl).not.toBeDefined();
    });

    it('should highlight error fields setting all of them to dirty', () => {
      instatiateController(bindingsMock);
      controller.highlightErrorFields();
      expect($scope[bindingsMock.name].$error.required[0].$setDirty).toHaveBeenCalled();
    });

    it('should reset form to pristine and untouched states', () => {
      instatiateController(bindingsMock);
      controller.reset();
      expect($scope[bindingsMock.name].$setPristine).toHaveBeenCalled();
      expect($scope[bindingsMock.name].$setUntouched).toHaveBeenCalled();
    });

  });

}());
