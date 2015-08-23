describe('Introduction Controller', function(){

  var $scope, controller;

  beforeEach(function(){
    module('app');
  });

  beforeEach(inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    controller = $controller('introductionController', {
      $scope : $scope
    });
  }));

  it('should contain a "title" attribute on scope', function(){
    expect($scope.title).toBeDefined();
  });

  it('should be "ng-rise" the value of title attribute on scope', function(){
    expect($scope.title).toEqual('ng-rise');
  });

  it('should contain a "message" attribute on scope', function(){
    expect($scope.message).toBeDefined();
  });

  it('should "message" attribute on scope have properly message', function(){
    var message = 'Well done, your angular base app is up and running. Enjoy!';
    expect($scope.message).toEqual(message);
  });

});
