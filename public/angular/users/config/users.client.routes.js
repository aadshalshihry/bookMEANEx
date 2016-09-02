'use strict';

angular.module('users').
config(function($interpolateProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('newUser', {
			url: '/users/post',
			templateUrl: '/angular/users/views/create-user.client.view.html',
			controller: 'UsersController',
			controllerAs: 'UsersCtrl'
		})
		.state('getUsers', {
			url: '/users/get',
			templateUrl: '/angular/users/views/get-users.client.view.html',
			controller: 'UsersController',
			controllerAs: 'UsersCtrl',
		})
		.state('updateUser', {
			url: '/users/put/update/:userId',
			templateUrl: '/angular/users/views/update-user.client.view.html',
			controller: 'UsersController',
			controllerAs: 'UsersCtrl'
		})
		.state('deleteUser', {
			url: '/users/delete/:userId',
			controller: 'UsersController',
			controllerAs: 'UsersCtrl'
		})
		.state('getUser', {
			url: '/users/get/:userId',
			templateUrl: '/angular/users/views/get-user.client.view.html',
			controller: 'UsersController',
			controllerAs: 'UsersCtrl'
		})

	$urlRouterProvider.otherwise('/');
});


// web1.controller('userCtrl', ['$scope', function($scope) {
// 	$scope.name = "Roman";
// }]);