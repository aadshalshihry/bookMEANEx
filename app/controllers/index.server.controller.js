'use strict';


exports.renderLoginPage = function(req, res) {
	res.render('login.hbs', {
		title: "Sign In",
		message: req.flash('signinMessage'),
		server_user: req.user
	});
};

exports.renderSignupPage = function(req, res) {
	res.render('signup.hbs', {
		title: "Sign Up",
		message: req.flash('signupMessage'),
		server_user: req.user
	});
};

exports.renderSignoutPage = function(req, res) {
	req.logout()
	res.redirect('/');
}

exports.isLoggedIn = function(req, res, next) {
	if(req.session.passport){
		return next();
	}
	req.flash('signinMessage', 'You Can not access the page without signin');
	res.redirect('/signin');
}