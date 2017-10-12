(function (){
  'use strict';

  describe('Author Contact Form', () => {
    const mock = angular.mock;
    let $componentController,
      controller,
      contactsResource,
      bindingsMock;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      contactsResource = $injector.get('contactsResource');
      $componentController = $injector.get('$componentController');

      bindingsMock = {
        formCtrl: {
          reset: function(){}
        }
      };

      controller = $componentController('nrAuthorContactForm', {}, bindingsMock);

      spyOn(contactsResource, 'save');
      spyOn(bindingsMock.formCtrl, 'reset');
    }));

    it('should save a contact', () => {
      controller.name = 'User';
      controller.email = 'some@email.com';
      controller.message = 'Some message';
      controller.submit();
      expect(contactsResource.save).toHaveBeenCalledWith({
        emailAddress: 'hello@rafaelcamargo.com'
      }, {
        name: 'User',
        email: 'some@email.com',
        message: 'Some message'
      });
    });

    it('should set success alert on save success', () => {
      const SUBMIT_SUCESS_MESSAGE = 'Message successfully sent. Thank you!';
      controller.onSubmitSuccess();
      expect(controller.alert).toEqual({
        type: 'success',
        message: SUBMIT_SUCESS_MESSAGE,
        retryAction: undefined
      });
    });

    it('should clear form fields on save success', () => {
      controller.name = 'User';
      controller.email = 'some@email.com';
      controller.message = 'Some message';
      controller.onSubmitSuccess();
      expect(controller.name).toEqual('');
      expect(controller.email).toEqual('');
      expect(controller.message).toEqual('');
    });

    it('should reset form on save success', () => {
      controller.onSubmitSuccess();
      expect(bindingsMock.formCtrl.reset).toHaveBeenCalled();
    });

    it('should set error alert on save error', () => {
      const SUBMIT_ERROR_MESSAGE = 'Something went wrong. Please, try again';
      controller.onSubmitError();
      expect(controller.alert).toEqual({
        type: 'error',
        message: SUBMIT_ERROR_MESSAGE,
        retryAction: controller.formCtrl.sendData
      });
    });

  });

}());
