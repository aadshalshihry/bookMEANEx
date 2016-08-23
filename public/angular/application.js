'use strict';

var mainAppModuleName = 'web1';

var mainAppModule = angular.module( mainAppModuleName, [ 'ui.router','ngResource', 'users']);

mainAppModule.config(['$locationProvider',function($locationProvider) {
	$locationProvider.hashPrefix('!');
}]);

//Manually bootstap the Angularjs application
angular.element(document).ready(function () {
    angular.bootstrap(document, [mainAppModuleName]);
});