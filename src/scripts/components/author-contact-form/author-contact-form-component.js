(function (){
  'use strict';

  function authorContactFormController(contactsResource){
    const _public = this;

    const SUBMIT_SUCESS_MESSAGE = 'Message successfully sent. Thank you!';
    const SUBMIT_ERROR_MESSAGE = 'Something went wrong. Please, try again';

    _public.submit = () => {
      return contactsResource.save({
        emailAddress: 'hello@rafaelcamargo.com'
      }, {
        name: _public.name,
        email: _public.email,
        message: _public.message
      });
    };

    _public.onSubmitSuccess = () => {
      setAlert('success', SUBMIT_SUCESS_MESSAGE);
      clearFields();
      resetForm();
    };

    _public.onSubmitError = () => {
      setAlert('error', SUBMIT_ERROR_MESSAGE, _public.formCtrl.sendData);
    };

    const clearFields = () => {
      _public.name = '';
      _public.email = '';
      _public.message = '';
    }

    const resetForm = () => {
      _public.formCtrl.reset();
    };

    const setAlert = (type, message, retryAction) => {
      _public.alert = {
        type,
        message,
        retryAction
      };
    };
  }

  const authorContactFormComponent = {
    templateUrl: '/components/author-contact-form/author-contact-form-template.html',
    controller: [
      'contactsResource',
      authorContactFormController
    ]
  };

  angular.module('app').component('ngAuthorContactForm', authorContactFormComponent);

}());
