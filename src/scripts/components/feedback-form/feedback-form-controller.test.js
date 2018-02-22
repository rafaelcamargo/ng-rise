(function (){
  'use strict';

  describe('Feedback Form', () => {
    let $componentController,
      contactsResource,
      controller;

    beforeEach(() => {
      module('app');
      inject($injector => {
        contactsResource = $injector.get('contactsResource');
        $componentController = $injector.get('$componentController');
        controller = $componentController('nrFeedbackForm');
      });

      spyOn(contactsResource, 'save').and.returnValue({$promise: {}});
    });

    it('should submit', () => {
      controller.experience = 5;
      controller.opinion = 'Cool';
      controller.suggestions = 'Nope';
      controller.submit();
      expect(contactsResource.save).toHaveBeenCalledWith({
        emailAddress: 'hello@rafaelcamargo.com'
      }, {
        experience: controller.experience,
        opinion: controller.opinion,
        suggestions: controller.suggestions
      });
    });

    it('should clear fields on submit success', () => {
      controller.experience = 5;
      controller.opinion = 'Cool';
      controller.suggestions = 'Nope';
      controller.submitSuccess();
      expect(controller.experience).toEqual('');
      expect(controller.opinion).toEqual('');
      expect(controller.suggestions).toEqual('');
    });

  });

}());
