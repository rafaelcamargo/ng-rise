(function (){
  'use strict';

  describe('Form', () => {
    let $componentController,
      $rootScope,
      $scope,
      controller,
      bindingsMock,
      responseMock;

    function mockFormModel(){
      $scope[bindingsMock.name] = {
        $error: {required: [{$setDirty: jasmine.createSpy()}]},
        $setPristine: jasmine.createSpy(),
        $setUntouched: jasmine.createSpy()
      };
    }

    function mockResponse(){
      responseMock = {
        success: {value: 'success'},
        error: {value: 'error'}
      };
    }

    function mockControllerBindings(){
      bindingsMock = {
        submit: jasmine.createSpy(),
        submitSuccess: jasmine.createSpy(),
        submitError: jasmine.createSpy(),
        name: 'testingForm'
      };
    }

    function mockControllerFetchBindings(){
      bindingsMock.fetch = jasmine.createSpy();
      bindingsMock.fetchSuccess = jasmine.createSpy();
      bindingsMock.fetchError = jasmine.createSpy();
    }

    function compileController(bindings = bindingsMock){
      controller = $componentController('nrForm', {
        $scope
      }, bindings);
    };

    function stubFormAction(action, responseType, shouldAbortCallbacks){
      bindingsMock[action].and.returnValue({
        then (successCallback, errorCallback){
          if (!shouldAbortCallbacks && responseType == 'success')
            successCallback(responseMock.success);
          else if (!shouldAbortCallbacks)
            errorCallback(responseMock.error);
        }
      });
    }

    beforeEach(() => {
      module('app');
      inject($injector => {
        $rootScope = $injector.get('$rootScope');
        $componentController = $injector.get('$componentController');
        $scope = $rootScope.$new();
      });
      mockControllerBindings();
      mockResponse();
      mockFormModel();
    });

    it('should clear any alert on form submit', () => {
      compileController();
      stubFormAction('submit', 'success', true, true);
      controller.alert = {some: 'alert'};
      controller.sendData();
      expect(controller.alert).toEqual(undefined);
    });

    it('should set loader css class on form submit', () => {
      compileController();
      stubFormAction('submit', 'success', true, true);
      controller.sendData();
      expect(controller.loaderCssClass).toEqual('form-loading');
    });

    it('should clear loader css class when form submit completes', () => {
      compileController();
      stubFormAction('submit', 'success');
      controller.sendData();
      expect(controller.loaderCssClass).toEqual('');
    });

    it('should call submit callback on form submit', () => {
      compileController();
      stubFormAction('submit', 'success');
      controller.sendData();
      expect(controller.submit).toHaveBeenCalled();
    });

    it('should call success callback on form submit success', () => {
      compileController();
      stubFormAction('submit', 'success');
      controller.sendData();
      expect(controller.submitSuccess).toHaveBeenCalledWith({
        value: 'success'
      });
    });

    it('should show custom success alert on submit success', () => {
      bindingsMock.submitSuccessMessage = 'My custom success!';
      compileController(bindingsMock);
      stubFormAction('submit', 'success');
      controller.sendData();
      expect(controller.alert).toEqual({
        type: 'success',
        message: bindingsMock.submitSuccessMessage,
        retryAction: undefined
      });
    });

    it('should call error callback on form submit error', () => {
      compileController();
      stubFormAction('submit', 'error');
      controller.sendData();
      expect(controller.submitError).toHaveBeenCalledWith({
        value: 'error'
      });
    });

    it('should just show error alert when no error callback is provided', () => {
      delete bindingsMock.submitError;
      compileController(bindingsMock);
      stubFormAction('submit', 'error');
      controller.sendData();
      expect(controller.alert).toEqual({
        type: 'error',
        message: 'Something went wrong. Please, try again',
        retryAction: controller.sendData
      });
    });

    it('should not call fetch callback on initialization if it was not provided', () => {
      compileController();
      spyOn(controller, 'fetchData');
      controller.$onInit();
      expect(controller.fetchData).not.toHaveBeenCalled();
    });

    it('should call fetch callback on initialization if it was provided', () => {
      mockControllerFetchBindings();
      compileController();
      stubFormAction('fetch', 'success');
      controller.$onInit();
      expect(controller.fetch).toHaveBeenCalled();
    });

    it('should call success callback on form fetch success', () => {
      mockControllerFetchBindings();
      compileController();
      stubFormAction('fetch', 'success');
      controller.$onInit();
      expect(controller.fetchSuccess).toHaveBeenCalledWith({
        value: 'success'
      });
    });

    it('should call error callback on form fetch error', () => {
      mockControllerFetchBindings();
      compileController();
      stubFormAction('fetch', 'error');
      controller.$onInit();
      expect(controller.fetchError).toHaveBeenCalledWith({
        value: 'error'
      });
    });

    // it('should bind form controller on initialization', () => {
    //   bindingsMock.bindCtrl = true;
    //   bindingsMock.ctrl = null;
    //   compileController(bindingsMock);
    //   controller.$onInit();
    //   expect(controller.ctrl.sendData).toBeDefined();
    //   expect(controller.ctrl.fetchData).toBeDefined();
    // });
    //
    // it('should not bind form controller on initialization', () => {
    //   compileController(bindingsMock);
    //   controller.$onInit();
    //   expect(controller.formCtrl).not.toBeDefined();
    // });

    it('should reset form to pristine and untouched states on submit success', () => {
      compileController(bindingsMock);
      stubFormAction('submit', 'success');
      controller.sendData();
      expect($scope[bindingsMock.name].$setPristine).toHaveBeenCalled();
      expect($scope[bindingsMock.name].$setUntouched).toHaveBeenCalled();
    });

  });

}());
