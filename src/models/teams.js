const mongoose = require('mongoose');

const randomEnum = ['random 1', 'random 2', 'random 3', 'random 4'];
const designationRandom = ['Founder and CEO', 'CTO', 'COO'];

const lindkinUrl = [
	'https://www.linkedin.com/company/qtoss-technology/',
	'https://www.linkedin.com/company/collegey/',
];
const randomText =
	'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li';

const imageUrl = [
	'https://images.pexels.com/photos/4342352/pexels-photo-4342352.jpeg',
	'https://images.pexels.com/photos/6893899/pexels-photo-6893899.jpeg',
	'https://images.pexels.com/photos/3931561/pexels-photo-3931561.jpeg',
];

const TeamsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default: function() {
				return randomEnum[Math.floor(Math.random() * randomEnum.length)];
			},
		},
		designation: {
			type: String,
			default: function() {
				return designationRandom[Math.floor(Math.random() * designationRandom.length)];
			},
		},
		description: {
			type: String,
			default: randomText,
		},

		lindkin: {
			type: String,
			default: function() {
				return lindkinUrl[Math.floor(Math.random() * lindkinUrl.length)];
			},
		},
		image: {
			type: String,
			default: function() {
				return imageUrl[Math.floor(Math.random() * imageUrl.length)];
			},
		},
		position: {
			type: String,
			default: function() {
				return randomEnum[Math.floor(Math.random() * randomEnum.length)];
			},
		},
		active: {
			type: Boolean,
			default: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Teams = mongoose.model('Teams', TeamsSchema);

module.exports = Teams;
