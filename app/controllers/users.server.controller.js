'use strict';

var User = require('mongoose').model('User');


exports.list = function(req, res, next) {
	User.find().exec(function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});

};

exports.create = function(req, res, next) {
	var user = new User(req.body);
	user.save(function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

exports.view = function(req, res) {
	res.json(req.user);

};

exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.delete = function(req, res) {
	var user = req.user;
	user.remove(function(err, user) {
		if (err) {
			console.log(err);
		} else {
			res.json(user);
		}
	});
};

exports.userById = function(req, res, next, id) {
	User.findById(id).exec(function(err, user) {
		if (err) {
			return next(err);
		}
		if(!user) return next(newError('Failed to load user ' + id));
		req.user = user;
		next()
	});
};