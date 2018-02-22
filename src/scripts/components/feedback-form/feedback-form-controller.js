(function (){
  'use strict';

  function feedbackFormController(contactsResource){
    const _public = this;

    _public.submit = () => {
      return contactsResource.save({
        emailAddress: 'hello@rafaelcamargo.com'
      }, {
        experience: _public.experience,
        opinion: _public.opinion,
        suggestions: _public.suggestions
      }).$promise;
    };

    _public.submitSuccess = () => {
      clearFields();
    };

    function clearFields(){
      _public.experience = '';
      _public.opinion = '';
      _public.suggestions = '';
    }
  }

  const feedbackFormComponent = {
    templateUrl: '/components/feedback-form/feedback-form-template.html',
    controller: [
      'contactsResource',
      feedbackFormController
    ]
  };

  angular.module('app').component('nrFeedbackForm', feedbackFormComponent);

}());
