'use strict';

angular.module('users')
	.controller('UsersController', ['$scope', '$stateParams', '$state', 'Users', function($scope, $stateParams, $state, Users) {
		$scope.client_user = {};

		$scope.create = function() {
			var client_user = new Users({
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				username: this.username,
				password: this.password,
				admin: this.admin
			});
			client_user.$save(function(response) {
				$state.go('getUser', {
					userId: client_user._id,
					redirect: true
				});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				console.log($scope.error);
			});
		};

		$scope.find = function() {
			$scope.client_users = Users.query();
		};

		$scope.findOne = function() {
			// Use the user 'get' method to send an appropriate GET request
			$scope.client_user = Users.get({
				userId: $stateParams.userId
			});
			console.log("**", $scope);
		};



		// Create a new controller method for updating a single user
		$scope.update = function() {
			// Use the user '$update' method to send an appropriate PUT request

			$scope.client_user.$update(function() {
				// If an user was updated successfully, redirect the user to the user's page
				$state.go('getUser', {
					userId: $stateParams.userId,
					redirect: true
				});
			}, function(errorResponse) {
				// Otherwise, present the user with the error message
				$scope.error = errorResponse.data.message;
			});
		};

		// Create a new controller method for deleting a single user
		$scope.delete = function(client_user) {
			// If an user was sent to the method, delete it

			client_user.$remove(function() {
				$state.go('getUsers', {

					redirect: true
				});
			});
		};
	}]);