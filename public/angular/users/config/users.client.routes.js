'use strict';

angular.module('users').
config(function($interpolateProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
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

	$urlRouterProvider.otherwise('/');
});


// web1.controller('userCtrl', ['$scope', function($scope) {
// 	$scope.name = "Roman";
// }]);