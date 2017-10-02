(function (){
  'use strict';

  describe('Copiable Value Input', () => {
    const mock = angular.mock;
    let $componentController,
      controller,
      mockButton,
      clipboardInstanceMock,
      $window,
      $timeout;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      $window = $injector.get('$window');
      $timeout = $injector.get('$timeout');
      $componentController = $injector.get('$componentController');

      controller = $componentController('ngCopiableValueInput');

      mockButton = () => {
        return angular.element('<button><i></i></button>');
      };

      $window.Clipboard = function(){};

      clipboardInstanceMock = {
        on: function(){}
      };

      spyOn($window, 'Clipboard').and.returnValue(clipboardInstanceMock);
      spyOn(clipboardInstanceMock, 'on');
    }));

    afterEach(() => {
      delete $window.Clipboard;
    });

    it('should initialize Clipboard', () => {
      controller.$onInit();
      expect($window.Clipboard).toHaveBeenCalledWith('[data-clipboard-trigger]');
    });

    it('should set clipboard copy success listener', () => {
      controller.$onInit();
      expect(clipboardInstanceMock.on).toHaveBeenCalledWith('success', controller.onClipboardCopySuccess);
    });

    it('should set checkmark icon on copy success', () => {
      const button = mockButton();
      controller.onClipboardCopySuccess({
        trigger: button
      });
      expect(button.find('i').attr('class')).toEqual('icon ion-checkmark-round');
    });

    it('should set default icon after 750ms showing checkmark icon', () => {
      const button = mockButton();
      controller.onClipboardCopySuccess({
        trigger: button
      });
      $timeout.flush();
      expect(button.find('i').attr('class')).toEqual('icon ion-clipboard');
    });

  });

}());
