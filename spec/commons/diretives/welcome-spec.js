describe('Welcome Directive', function(){

  var scope, element;

  beforeEach(function(){
    module('app');
    module('templates');
  });

  beforeEach(inject(function($rootScope, $compile){
    scope = $rootScope.$new();
    element = angular.element('<welcome data-title="ng-rise" data-message="welcome"></welcome>');
    $compile(element)(scope);
    scope.$digest();
  }));

  it('should contain one "h1" element', function(){
    expect(element.find('h1').length).toEqual(1);
  });

  it('should contain two "p" elements', function(){
    expect(element.find('p').length).toEqual(2);
  });

});
