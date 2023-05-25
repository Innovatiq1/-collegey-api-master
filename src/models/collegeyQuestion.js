const mongoose = require('mongoose');

    const CollegeyQuestionSchema = new mongoose.Schema(
	{
		question: {type: String},
		responseLable: {type: String},
		question_content: {type: String},
		status: {type: Boolean},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updateAt: {
			type: Date,
			default: Date.now,
		},
	},
);


const CollegeyFeed = mongoose.model('CollegeyQuestion', CollegeyQuestionSchema);

module.exports = CollegeyFeed;
