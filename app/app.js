var ngRise = angular.module('ngRise', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'app/intro/introView.html',
				controller: 'introController'
			}).otherwise({
				redirectTo: '/'
			});
		});