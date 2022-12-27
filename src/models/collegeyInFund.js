const mongoose = require('mongoose');

const CollegeyInFundInSchema = new mongoose.Schema({
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

const CollegeyInFundIn = mongoose.model('fund-in', CollegeyInFundInSchema);

module.exports = CollegeyInFundIn;
