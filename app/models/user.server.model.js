'use strict';

var mongoose 		= require('mongoose');
var crypto			= require('crypto');
var Schema 			= mongoose.Schema;

var UserSchema = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	email: {
		type: String,
		match: [/.+\@.+..+/, 'Please fill a valid email'],
		unique: true
	},
	username: {
		type: String,
		unique: true,
		trim: true,
		require: 'Username is required'
	},
	password: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now
	}, 
	salt: {
		type: String
	},
	admin: {
		type: Boolean,
		default: false
	}
}); 

UserSchema.virtual('fullName').get(function() {
	return this.firstName + " " + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';

});

// Use a pre-save middleware to hash the password
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};


UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('User', UserSchema);