(function (){
  'use strict';

  function copiableValueInputController ($window, $timeout) {
    const _public = this;

    const TRIGGER_SELECTOR = '[data-clipboard-trigger]';

    _public.$onInit = () => {
      const clipboard = buildCopiableTrigger();
      setClipboardCopySuccessListener(clipboard);
    };

    _public.onClipboardCopySuccess = evt => {
      setButtonIcon(evt, 'ion-checkmark-round');
      $timeout(() => {
        setButtonIcon(evt, 'ion-clipboard');
      }, 750);
    };

    const buildCopiableTrigger = () => {
      return new $window.Clipboard(TRIGGER_SELECTOR);
    };

    const setClipboardCopySuccessListener = clipboard => {
      clipboard.on('success', _public.onClipboardCopySuccess);
    };

    const setButtonIcon = (evt, iconName) => {
      const iconElement = angular.element(evt.trigger).find('i');
      iconElement.attr('class', `icon ${iconName}`);
    }
  }

  const copiableValueInputComponent = {
    templateUrl: '/components/copiable-value-input/copiable-value-input-template.html',
    controller: [
      '$window',
      '$timeout',
      copiableValueInputController
    ],
    bindings: {
      value: '@'
    }
  };

  angular.module('app').component('nrCopiableValueInput',
    copiableValueInputComponent);

}());
