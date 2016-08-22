'use strict';

var web1 = angular.module('web1', ['ngResource','ui.router']);
web1.config(function($interpolateProvider, $urlRouterProvider, $stateProvider , $locationProvider) {
	$interpolateProvider.startSymbol('{[{');
  	$interpolateProvider.endSymbol('}]}');
  	$locationProvider.html5Mode(true);
  	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/angular/home.html',
			controller: 'articlesCtrl',
			views: {

			}
		})
		.state('articles', {
			url: '/a',
			templateUrl: '/angular/a.html',
			controller: 'articlesCtrl'
		});

		$urlRouterProvider.otherwise('/#/');
  });


web1.controller('userCtrl', ['$scope', function($scope) {
	$scope.name = "Roman";
}]);


