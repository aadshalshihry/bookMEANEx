'use strict';

angular.module('users')
.controller('UsersController', ['$scope', '$stateParams', '$location', 'Users', function($scope, $stateParams, $location, Users) {


	$scope.create = function() {
		var user = new Users({
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			username: this.username,
			password: this.password,
			admin: this.admin
		});
		console.log("First Name:", this.firstName);
		if(user.firstName){
			user.$save(function(response) {
				$location.path('/api/users/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				console.log($scope.error);
			});
		} else {
			console.log("user.firstName is undefind.");
		}
	};

	$scope.find = function() {
		$scope.users = Users.query();
	};

	$scope.findOne = function() {
		// Use the user 'get' method to send an appropriate GET request
		$scope.user = Users.get({
			userId: $stateParams.userId
		});
	};

	// Create a new controller method for updating a single user
	$scope.update = function() {
		// Use the user '$update' method to send an appropriate PUT request
		$scope.user = Users.get({
			userId: $stateParams.userId
		});
		console.log($scope.user);

		$scope.user.$update(function() {
			// If an user was updated successfully, redirect the user to the user's page
			$location.path('api/users/' + $stateParams.userId);
		}, function(errorResponse) {
			// Otherwise, present the user with the error message
			$scope.error = errorResponse.data.message;
		});
	};

	// Create a new controller method for deleting a single user
	$scope.delete = function(user) {
		// If an user was sent to the method, delete it
		if (user) {
			// Use the user '$remove' method to delete the user
			user.$remove(function() {
				// Remove the user from the articles list
				for (var i in $scope.articles) {
					if ($scope.articles[i] === user) {
						$scope.articles.splice(i, 1);
					}
				}
			});
		} else {
			// Otherwise, use the user '$remove' method to delete the user
			$scope.user.$remove(function() {
				$location.path('users');
			});
		}
	};
}]);