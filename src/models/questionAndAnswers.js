const mongoose = require('mongoose');

const questionsAndAnswersSchema = new mongoose.Schema(
	{
		//User Reference Object
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Question must belong to a User!'],
		},

		// Question
		question: { type: String, default: 'Ask A question?' },

		questionDescription: {
			type: String,
		},
		questionTag:{
            type: [String],
            default:null
        },

		answers: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'answers',
				},
			], 
		},
		/* answers: {
		 	type: [
		 		{
		 			//User Reference Object
		 			user: {
		 				type: mongoose.Schema.Types.ObjectId,
		 				ref: 'User',
		 			},
		 			answerData: {
		 				type: String,
		 			},
		 			createdAt: {
		 				type: Date,
		 				default: Date.now,
		 			},
		 			updatedAt: {
		 				type: Date,
		 				default: Date.now,
		 			},
		 			likes: {
		 				type: Number,
		 				required: true,
		 				default: 0,
		 			},
		 		},
		 	],
		 }, */

		//Captures date and time when Object is created and is used for sorting by date created
		createdAt: {
			type: Date,
			default: Date.now,
		},

		// Number of Shares
		shares: {
			type: Number,
			required: true,
			default: function() {
				return Math.floor(Math.random() * 10) + 1;
			},
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//Populate middleware function
questionsAndAnswersSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		select: 'name avatar',
	}).populate({
		path: 'answers.user',
		select: 'name avatar',
	});
	next();
});

questionsAndAnswersSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'answers',
	});
	next();
});
const QuestionsAndAnswers = mongoose.model('QuestionsAndAnswers', questionsAndAnswersSchema);

module.exports = QuestionsAndAnswers;
