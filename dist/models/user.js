'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
	username: String,
	password: String,
	create_date: Date
});

module.exports = mongoose.model('user', user);