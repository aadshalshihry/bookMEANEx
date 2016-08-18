'use strict';

var mongoose 		= require('mongoose');
var Schema 			= mongoose.Schema;

var AdminSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	level: {
		type: Number,
		default: 5

	},
	created: {
		type: Date,
		default: Date.now
	}

}); 

module.exports = mongoose.model('Admin', AdminSchema);