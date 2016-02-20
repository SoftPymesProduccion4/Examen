var app = angular.module('AppClors', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);


app.config(function ($routeProvider) {
	$routeProvider.when("/",{
		controller: "homeController"
	});
	
	$routeProvider.otherwise({ redirectTo: "/"});
});



