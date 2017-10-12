(function (){
  'use strict';

  function formController ($scope) {
    const LOADER_CSS_CLASS = 'form-loading';

    const _public = this;

    _public.$onInit = () => {
      if (_public.bindCtrl)
        _public.ctrl = _public;
      if (shouldFetchData())
        _public.fetchData();
    };

    _public.sendData = () => {
      request({
        action: _public.submit,
        success: _public.submitSuccess,
        error: _public.submitError
      });
    };

    _public.fetchData = () => {
      request({
        action: _public.fetch,
        success: _public.fetchSuccess,
        error: _public.fetchError
      });
    };

    _public.highlightErrorFields = () => {
      const form = getFormModel();

      angular.forEach(form.$error, errorFields => {
        for (let i=0; i < errorFields.length; i++)
          errorFields[i].$setDirty();
      });
    };

    _public.reset = () => {
      const form = getFormModel();

      form.$setPristine();
      form.$setUntouched();
    };

    const getFormModel = () => {
      return $scope[_public.name];
    };

    const shouldFetchData = () => {
      return _public.fetch
    };

    const clearAlert = () => {
      _public.alert = null;
    };

    const setLoaderCssClass = cssClass => {
      _public.loaderCssClass = cssClass;
    };

    const clearLoaderCssClass = () => {
      setLoaderCssClass('');
    };

    const onRequestComplete = () => {
      clearLoaderCssClass();
    };

    const request = options => {
      const request = options.action();

      if (request && request.$promise){
        clearAlert();
        setLoaderCssClass(LOADER_CSS_CLASS);
        request.$promise.then(response => {
          onRequestComplete();
          options.success(response);
        }, error => {
          onRequestComplete();
          options.error(error);
        });
      }
    };
  }

  const requestFormComponent = {
    templateUrl: '/components/form/form-template.html',
    transclude: true,
    controller: [
      '$scope',
      formController
    ],
    bindings: {
      fetch: '<',
      fetchSuccess: '<',
      fetchError: '<',
      submit: '<',
      submitSuccess: '<',
      submitError: '<',
      alert: '=',
      name: '@',
      bindCtrl: '=',
      ctrl: '='
    }
  };

  angular.module('app').component('nrForm', requestFormComponent);

}());
