'use strict';

angular.module('users').controller('UsersController', ['$scope', '$routeParams', '$location', 'Authentication', 'Users', function($scope, $routeParams, $location, Authentication, Users) {


	$scope.create = function() {
		var user = new Users({
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			username: this.username,
			password: this.password,
			admin: this.admin
		});

		user.$save(function(response) {
			$location.path('users/' + response._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};
}]);