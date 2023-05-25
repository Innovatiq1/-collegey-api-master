const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const waitlistSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		enum: [
			'High-school student',
			'College student',
			'High-school counselor',
			'IEC',
			'university',
			'parent',
			'Mentor',
			'Impact Partner',
			'Other',
		],
		default: 'High-school student',
	},
});

const Waitlist = model('Waitlist', waitlistSchema);

module.exports = Waitlist;
