const mongoose = require('mongoose');

const categoryEnum = ['category 1', 'category 2', 'category 3', 'category 4'];
const randomEnum = ['random 1', 'random 2', 'random 3', 'random 4'];

const FAQSchema = new mongoose.Schema(
	{
		ques: {
			type: String,
			default: function() {
				return randomEnum[Math.floor(Math.random() * randomEnum.length)];
			},
		},
		answer: {
			type: String,
			default: function() {
				return randomEnum[Math.floor(Math.random() * randomEnum.length)];
			},
		},
		category: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: "faqCategories",
		},
		position: {
			type: String,
			default: function() {
				return randomEnum[Math.floor(Math.random() * randomEnum.length)];
			},
		},
		active: {
			type: Boolean,
			default: true,
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

const FAQ = mongoose.model('FAQ', FAQSchema);

module.exports = FAQ;
