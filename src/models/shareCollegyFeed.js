const mongoose = require('mongoose');

const shareCollgeyFeedSchema = new mongoose.Schema({

    collegyFeed_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'CollegeyFeed',
        default: null
    },
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Chat must have a user!'],
	},
    description:{
        type: String,
    },

	createdAt: {
		type: Date,
		default: Date.now(),
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

shareCollgeyFeedSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user_id',
	});
	next();
});
shareCollgeyFeedSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'collegyFeed_id',
	});
	next();
});

const shareCollgeyFeed = mongoose.model('shareCollgeyFeed', shareCollgeyFeedSchema);
module.exports = shareCollgeyFeed;