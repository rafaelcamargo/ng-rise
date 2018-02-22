(function (){
  'use strict';

  describe('Author Contact Form', () => {
    let $componentController,
      controller,
      contactsResource;

    beforeEach(module('app'));

    beforeEach(inject($injector => {
      contactsResource = $injector.get('contactsResource');
      $componentController = $injector.get('$componentController');
      controller = $componentController('nrAuthorContactForm');
      spyOn(contactsResource, 'save').and.returnValue({$promise:{}});
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

    it('should clear form fields on save success', () => {
      controller.name = 'User';
      controller.email = 'some@email.com';
      controller.message = 'Some message';
      controller.onSubmitSuccess();
      expect(controller.name).toEqual('');
      expect(controller.email).toEqual('');
      expect(controller.message).toEqual('');
    });

  });

}());
