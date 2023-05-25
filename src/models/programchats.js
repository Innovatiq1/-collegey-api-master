const mongoose = require('mongoose');

const programchatSchema = new mongoose.Schema({
	program: {
		type: mongoose.Schema.ObjectId,
		ref: 'Programs',
		required: [true, 'Chat must have a program!'],
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

programchatSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		// select: 'name avatar',
	});
	this.populate({
		path:'userAssociated'
	})
	next();
});

const programchat = mongoose.model('programchat', programchatSchema);
module.exports = programchat;
