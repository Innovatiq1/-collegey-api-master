const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const randomEnum = ['random 1', 'random 2', 'random 3', 'random 4'];
const linkedIn = 'https://www.linkedin.com/company/collegey/';

const mentorSchema = new Schema({
	name: {
		type: String,
		required: true,
		default: function() {
			return randomEnum[Math.floor(Math.random() * randomEnum.length)];
		},
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	location: {
		type: String,
	},
	citizenship: {
		type: String,
		required: true,
	},
	fullLegalName: { type: String },
	aboutYou: {
		type: String,
		maxLength: 210,
	},
	favBooks: [
		{
			type: String,
		},
	],
	interest: [{ type: String }],
	expertise: [{ type: String }],
	industry: { type: String },
	lastCollegeDegree: { type: String },
	linkedIn: {
		type: String,
		default: linkedIn,
	},
	experience: { type: Number },
	lastEducationalInstitutionAttended: { type: String },
	website: { type: String },
});

const mentor = model('Mentor', mentorSchema);
module.exports = mentor;
