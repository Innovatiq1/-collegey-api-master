const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const timezonesSchema = new Schema({
	value: {
		type: String,
		required: true,
	},
	offset: {
		type: Number,
		required: true,
	},
	abbr: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	text: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
});

const Timezones = model('Timezones', timezonesSchema);

module.exports = Timezones;
