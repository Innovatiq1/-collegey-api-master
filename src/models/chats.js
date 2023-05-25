const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
	project: {
		type: mongoose.Schema.ObjectId,
		ref: 'Projects',
		required: [true, 'Chat must have a project!'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Chat must have a user!'],
	},
	text: {
		type: String,
		default:null
		// required: [true, 'Chat must have a text!'],
	},
	file:{
		type:String,
		default:null
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
	createdAt: {type: Date,required: true,default: Date.now,},
    deleted: {
		type: Boolean,
		default: false,
	},
});

chatSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		// select: 'name avatar',
	});
	this.populate({
		path:'userAssociated'
	})
	next();
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
