// const mongoose = require('mongoose');

// const likeDislikeSchema = new mongoose.Schema(
// 	{

// 		//User Reference Object
// 		user_id: {
// 			type: mongoose.Schema.ObjectId,
// 			ref: 'User',
// 			required: [true, 'It must belong to a User!'],
// 			Unique:false,
// 		},

//         collegyFeed_id: { 
//             type: mongoose.Schema.ObjectId,
// 			ref: 'CollegeyFeed',
// 			required: [true, 'It must belong to Collegy Feed!'],
// 			Unique:false,

//         },
// 		//Captures date and time when Object is created and is used for sorting by date created
// 		createdAt: {
// 			type: Number,
// 			default: Date.now(),
// 		},
// 	} 
// );

// likeDislikeSchema.pre(/^find/, function(next) {
// 	this.populate({
// 		path: 'user_id',
// 	});
// 	next();
// });
// const likeDislikeCollegyFeed = mongoose.model('likeDislikeCollegeyFeed', likeDislikeSchema);

// module.exports = likeDislikeCollegyFeed;




const mongoose = require('mongoose');

const likeDislikeSchema = new mongoose.Schema({

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

	createdAt: {
		type: Date,
		default: Date.now(),
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

likeDislikeSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user_id',
	});
	next();
});


const likeDislikeCollegyFeed = mongoose.model('likeDislikeCollegeyFeed', likeDislikeSchema);
module.exports = likeDislikeCollegyFeed;
