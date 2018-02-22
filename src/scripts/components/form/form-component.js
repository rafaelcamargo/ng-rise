(function (){
  'use strict';

  function formController ($scope) {
    const LOADER_CSS_CLASS = 'form-loading';
    const SUBMIT_SUCCESS_MESSAGE = 'Success!';
    const SUBMIT_ERROR_MESSAGE = 'Something went wrong. Please, try again';

    const _public = this;

    _public.$onInit = () => {
      if (shouldFetchData())
        _public.fetchData();
    };

    _public.sendData = () => {
      request({
        action: _public.submit,
        success: _public.submitSuccess,
        error: _public.submitError,
        retryAction: _public.sendData
      });
    };

    _public.fetchData = () => {
      request({
        action: _public.fetch,
        success: _public.fetchSuccess,
        error: _public.fetchError,
        retryAction: _public.fetchData
      });
    };

    const shouldFetchData = () => {
      return _public.fetch
    };

    const clearAlert = () => {
      delete _public.alert;
    };

    const setLoaderCssClass = cssClass => {
      _public.loaderCssClass = cssClass;
    };

    const request = options => {
      clearAlert();
      setLoaderCssClass(LOADER_CSS_CLASS);
      options.action().then(response => {
        onRequestSuccess(options.success, response)
      }, err => {
        onRequestError(options.error, err, options.retryAction)
      });
    };

    const onRequestSuccess = (successCallback, response) => {
      setAlert('success', getSubmitSuccessMessage());
      successCallback(response);
      onRequestComplete();
      resetForm();
    };

    const getSubmitSuccessMessage = () => {
      const customMsg = _public.submitSuccessMessage;
      return customMsg ? customMsg : SUBMIT_SUCCESS_MESSAGE;
    };

    const onRequestError = (errorCallback, err, retryAction) => {
      if(errorCallback)
        errorCallback(err);
      else
        setAlert('error', SUBMIT_ERROR_MESSAGE, retryAction);
      onRequestComplete();
    };

    const onRequestComplete = () => {
      setLoaderCssClass('');
    };

    const resetForm = () => {
      const form = getFormModel();
      form.$setPristine();
      form.$setUntouched();
    };

    const getFormModel = () => {
      return $scope[_public.name];
    };

    const setAlert = (type, message, retryAction) => {
      _public.alert = {
        type,
        message,
        retryAction
      };
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
      submitSuccessMessage: '@',
      submitError: '<',
      name: '@',
      bindCtrl: '=',
      ctrl: '='
    }
  };

  angular.module('app').component('nrForm', requestFormComponent);

}());
