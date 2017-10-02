(function (){
  'use strict';

  describe('Alert', () => {
    const mock = angular.mock;
    let $componentController,
      controller,
      instantiateController,
      baseBindingsMock;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      $componentController = $injector.get('$componentController');

      baseBindingsMock = {
        alert: {
          type: 'error',
          message: 'There was an error',
          retryAction: () => {}
        }
      };

      instantiateController = bindings => {
        controller = $componentController('ngAlert', {}, bindings);
      };
    }));

    it('should call retry action', () => {
      let hasFiredRetryAction = false;
      const retryActionMock = () => {
        hasFiredRetryAction = true;
      };

      baseBindingsMock.alert.retryAction = retryActionMock;
      instantiateController(baseBindingsMock);
      controller.retry();
      expect(hasFiredRetryAction).toEqual(true);
    });

    it('should remove itself when calling its retry action', () => {
      instantiateController(baseBindingsMock);
      controller.retry();
      expect(controller.alert).toEqual(undefined);
    });

    it('should call custom button action', () => {
      const alert = {
        type: 'success',
        message: 'This is a custom message',
        customButton: {
          label: 'Custom label',
          icon: 'file_download',
          action: jasmine.createSpy()
        }
      };
      instantiateController({
        alert: alert
      });
      controller.customAction();
      expect(alert.customButton.action).toHaveBeenCalled();
    });
  });

}());
