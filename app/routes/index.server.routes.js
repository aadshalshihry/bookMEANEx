'use strict';

var users = require('../controllers/index.server.controller');

module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Express',
			user: req.user
		});
	});

	app.route('/login')
		.get(users.renderLoginPage)
		.post(passport.authenticate('local-signin', {
			successRedirect: '/users',
			failureRedirect: '/login',
			failureFlash: true
		}));

	app.route('/signup')
		.get(users.renderSignupPage)
		.post(passport.authenticate('local-signup', {
			successRedirect: '/users',
			failureRedirect: '/signup',
			failureFlash: true
		}));
	app.get('/signout', users.isLoggedIn, users.renderSignoutPage);
};