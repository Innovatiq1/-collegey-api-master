const mongoose = require('mongoose');

const collegeyWithPartnernSchema = new mongoose.Schema({
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

const CollegeyWithPartner = mongoose.model('partner-with', collegeyWithPartnernSchema);

module.exports = CollegeyWithPartner;
