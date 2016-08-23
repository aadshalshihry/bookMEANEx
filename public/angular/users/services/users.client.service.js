'use strict';

angular.module('users').factory('Users', ['$resource', function($resource){
	return $resource('/api/users/:usersId', {
		usersId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);