const mongoose = require('mongoose');

const randomEnum = ['random 1', 'random 2', 'random 3', 'random 4'];
const country = ['country 1', 'country 2', 'country 3', 'country 4'];
const city = ['city 1', 'city 2', 'city 3', 'city 4'];
const randomText = 'Li Europan lingues es membres del sam familie. Lor separat existentie.';
const email = ['gmail.com', 'yahoo.com', 'hotmail.com', 'live.com'];

const investsAtCollegeySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default: function() {
				return randomEnum[Math.floor(Math.random() * randomEnum.length)];
			},
		},
		city: {
			type: String,
			default: function() {
				return city[Math.floor(Math.random() * city.length)];
			},
		},
		country: {
			type: String,
			default: function() {
				return country[Math.floor(Math.random() * country.length)];
			},
		},

		email: {
			type: String,
			default: function() {
				return `${Math.random()
					.toString(36)
					.replace('0.', '')}@${email[Math.floor(Math.random() * email.length)]}`;
			},
		},
		organisation: {
			type: String,
			default: randomText,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const investsAtCollegey = mongoose.model('investsAtCollegey', investsAtCollegeySchema);

module.exports = investsAtCollegey;
