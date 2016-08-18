'use strict';

var admin = require('../controllers/admin.server.controller');
var user = require('../controllers/users.server.controller');

module.exports = function (app) {
	app.route('/users/admins')
	   .get(admin.list);
	   
   	app.route('/users/admins/:userId')
	   .post(admin.create);

	app.route('/users/admin/:adminId')
	 	.get(admin.view)
	 	.put(admin.update)
	 	.delete(admin.delete);

	app.param('adminId', admin.adminById);
	app.param('userId', user.userById);
};