const mongoose = require('mongoose');

const CollegeyInvestInSchema = new mongoose.Schema({
	mainTitle: { type: String },
	title: { type: String },
	subTitle: { type: String },
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

const CollegeyInvestIn = mongoose.model('invest-in', CollegeyInvestInSchema);

module.exports = CollegeyInvestIn;
