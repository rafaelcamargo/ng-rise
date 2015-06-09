;(function(app){

  app.config(function($routeProvider){
    $routeProvider.when('/', {
      templateUrl: 'app/views/introduction/introduction-template.html',
      controller: 'introductionController'
    }).otherwise({
      redirectTo: '/'
    });
  });

})(app);