const mongoose = require('mongoose');

const projectFileSchema = new mongoose.Schema({
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
	file:{
		type:String,
	},
	file_name:{
		type:String,
	},
	file_type:{
		type:String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	deleted: {
		type: Boolean,
		default: false,
	},
	name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
	},
    avatar: {
		type: String,
	},
});

projectFileSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'User',
		select: 'name avatar',
	});
	next();
});

const ProjectFile = mongoose.model('ProjectFile', projectFileSchema);
module.exports = ProjectFile;
