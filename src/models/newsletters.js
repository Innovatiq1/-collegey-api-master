const mongoose = require('mongoose');

const newsLetterSchema = new mongoose.Schema({
	email: { type: String },
	userId: { type: mongoose.Schema.Types.ObjectId },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const NewsLetter = mongoose.model('newsLetter', newsLetterSchema);

module.exports = NewsLetter;
