(function(app){

  app.directive('welcome', function(){

    return {
      restrict: 'E',
      replace: true,
      scope: {
        title: '@',
        message: '@'
      },
      templateUrl: 'app/commons/directives/welcome/welcome-template.html'
    };

  });

}(app));
