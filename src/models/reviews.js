const mongoose = require('mongoose');

const randomEnum = ['random 1', 'random 2', 'random 3', 'random 4'];
const country = ['India 1', 'India 2', 'India 3', 'India 4'];
const randomText =
	'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li';

const url = [
	'https://www.youtube.com/watch?v=GNJ-kT6gFhQ',
	'https://www.youtube.com/watch?v=apouPYPh_as',
];
const dataType = ['url', 'text'];

const ReviewsSchema = new mongoose.Schema(
	{
		reviewType: {
			type: String,
			enum: ['university', 'user'],
		},
		name: {
			type: String,
			default: function() {
				return randomEnum[Math.floor(Math.random() * randomEnum.length)];
			},
		},
		qualification: {
			type: String,
			default: function() {
				return randomEnum[Math.floor(Math.random() * randomEnum.length)];
			},
		},
		country: {
			type: String,
			default: function() {
				return country[Math.floor(Math.random() * country.length)];
			},
		},
		type: {
			type: String,
			// ['url', 'text']; (if type is text then text else url)
			default: function() {
				return dataType[Math.floor(Math.random() * dataType.length)];
			},
		},
		url: {
			type: String,
			default: function() {
				return url[Math.floor(Math.random() * url.length)];
			},
		},
		text: {
			type: String,
			default: randomText,
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
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

ReviewsSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user_id',
		select: 'name avatar',
	});
	next();
});
const Reviews = mongoose.model('Reviews', ReviewsSchema);

module.exports = Reviews;
