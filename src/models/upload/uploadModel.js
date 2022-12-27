const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'upload must have a owner!'],
	},
	project: {
		type: mongoose.Schema.ObjectId,
		ref: 'Projects',
	},
	group: {
		type: mongoose.Schema.ObjectId,
		ref: 'Group',
	},
	// List of users
	userList: {
		type: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
			},
		],
	},
	fileAccessType: { type: String, enum: ['public', 'private'], default: 'private' },
	fileUrl: {
		type: String,
	},
	downloads: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

// uploadSchema.pre(/^find/, function(next) {
// 	this.populate('user').populate({
// 		path: 'project',
// 		select: 'name',
// 	});
// 	next();
// });

const upload = mongoose.model('upload', uploadSchema);
module.exports = upload;
