const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const randomEnum = ['random 1', 'random 2', 'random 3', 'random 4'];
const country = ['country 1', 'country 2', 'country 3', 'country 4'];
const city = ['city 1', 'city 2', 'city 3', 'city 4'];
const state = ['state 1', 'state 2', 'state 3', 'state 4'];

const ParentProfileSchema = new Schema({
	fullName: {
		type: String,
		required: true,
		default: function() {
			return randomEnum[Math.floor(Math.random() * randomEnum.length)];
		},
	},
	occupation: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		default: function() {
			return city[Math.floor(Math.random() * city.length)];
		},
	},
	state: {
		type: String,
		default: function() {
			return state[Math.floor(Math.random() * state.length)];
		},
	},
	country: {
		type: String,
		default: function() {
			return country[Math.floor(Math.random() * country.length)];
		},
	},

	child: [
		{
			childFullName: {
				type: String,
				require: true,
			},
			childSchoolName: {
				type: String,
				require: true,
			},
			childGrade: {
				type: String,
				default: function() {
					return Math.floor(Math.random() * 12) + 1;
				},
			},
			schoolCity: {
				type: String,
				default: function() {
					return city[Math.floor(Math.random() * city.length)];
				},
			},
			schoolState: {
				type: String,
				default: function() {
					return state[Math.floor(Math.random() * state.length)];
				},
			},
			schoolCountry: {
				type: String,
				default: function() {
					return country[Math.floor(Math.random() * country.length)];
				},
			},
		},
	],
});

const ParentProfile = model('ParentProfile', ParentProfileSchema);

module.exports = ParentProfile;
