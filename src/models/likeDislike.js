const mongoose = require('mongoose');

const likeDislikeSchema = new mongoose.Schema(
	{
		//User Reference Object
		user_id: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'It must belong to a User!'],
		},

        answer_id: { 
            type: mongoose.Schema.ObjectId,
			ref: 'answers',
			unique: true,
			required: [true, 'It must belong to a Questions and answers!'],
        },
		likeStatus:{
			type : Boolean,
			default: true,
		},
		//Captures date and time when Object is created and is used for sorting by date created
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

likeDislikeSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		select: 'name avatar',
	});
	next();
});

likeDislikeSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'answers',
	});
	next();
});
const likeDislike = mongoose.model('likeDislike', likeDislikeSchema);

module.exports = likeDislike;
