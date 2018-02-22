(function (){
  'use strict';

  function authorContactFormController(contactsResource){
    const _public = this;

    _public.submit = () => {
      return contactsResource.save({
        emailAddress: 'hello@rafaelcamargo.com'
      }, {
        name: _public.name,
        email: _public.email,
        message: _public.message
      }).$promise;
    };

    _public.onSubmitSuccess = () => {
      clearFields();
    };

    const clearFields = () => {
      _public.name = '';
      _public.email = '';
      _public.message = '';
    }
  }

  const authorContactFormComponent = {
    templateUrl: '/components/author-contact-form/author-contact-form-template.html',
    controller: [
      'contactsResource',
      authorContactFormController
    ]
  };

  angular.module('app').component('nrAuthorContactForm', authorContactFormComponent);

}());
