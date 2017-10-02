(function () {
  'use strict';

  const contactsResource = function (ENV, $resource) {
    return $resource(`${ENV.FORMSPREE.BASE_URL}/:emailAddress`);
  };

  angular.module('app').factory('contactsResource', [
    'ENV',
    '$resource',
    contactsResource
  ]);

})();
