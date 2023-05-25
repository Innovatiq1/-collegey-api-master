const mongoose = require('mongoose');

const collegeyAtCareerSchema = new mongoose.Schema({
	mainTitle: { type: String },
	title: { type: String },
	subTitle: { type: String },
	imgSubTitle: { type: String },
	description: { type: String },
	bannerImg: { type: String },
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updateAt: {
		type: Date,
		default: Date.now,
	},
});

const CollegeyAtCareer = mongoose.model('career-at', collegeyAtCareerSchema);

module.exports = CollegeyAtCareer;
