const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	projectAssociated: {
		type: mongoose.Schema.ObjectId,
		ref: 'Projects',
        default: null
	},
    feedAssociated: {
        type: mongoose.Schema.ObjectId,
        ref: 'CollegeyFeed',
        default: null
    },
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Chat must have a user!'],
	},
	text: {
		type: String,
	},
    photoUrl:{
        type: String,
        default: null
    },
    videoUrl:{
        type: String,
        default: null
    },
    usersAssociated:{
        type: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
		            ref: 'User',
                },
                userText: {
                    type: String
                }
            }
        ]
    },
    fileUrl:{
        type:String,
        default:null
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

commentSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
	});
    this.populate({
        path:'usersAssociated.user'
    })
	next();
});


const Comments = mongoose.model('Comments', commentSchema);
module.exports = Comments;
