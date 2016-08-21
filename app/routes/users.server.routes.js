'use strict';

var user = require('../controllers/users.server.controller');

module.exports = function(app) {
	app.route('/users')
		.get(user.list)
		.post(user.create);

	app.route('/users/:userId')
		.get(user.view)
		.put(user.update)
		.delete(user.delete);
		
	app.param('userId', user.userById);
};