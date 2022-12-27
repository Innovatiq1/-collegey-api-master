const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
    {
        
        //User Reference Object
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Question must belong to a User!'],
        },
        question_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'questionsandanswers',
            required: [true, 'Question must belong to a Questions and answers!'],
        },
        answerDescription: { 
            type: String, 
            required: true
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Question must belong to a User!'],
        },
        likedUser: [{ type: mongoose.Schema.Types.ObjectId}],
        dislikeUser: [{ type: mongoose.Schema.Types.ObjectId}],
        
        likeCount: {
            type: Number,
            default: 0,
        },
        dislikeCount: {
            type: Number,
            default: 0,
        },
        questionDescription: String,
        type: Number, //1: question and answers 2: side static questions
        //Captures date and time when Object is created and is used for sorting by date created
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


answerSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		select: 'name avatar',
	});
	next();
});
answerSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'questionsandanswers',
	});
	next();
});
answerSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'likeDislike',
	});
	next();
});
const answerModel = mongoose.model('answers', answerSchema);

module.exports = answerModel;
