const mongoose = require('mongoose');

const partnerProjectSchema = new mongoose.Schema({
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Projects',
		required: [true, 'Should have a project ID'],
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Should have a user ID'],
	},
	role: {
		type: String,
		enum: ['admin', 'member'],
		required: [true, 'Should have a role, admin or member role'],
	},
	active: {
		type: Boolean,
		default: false,
	},
});

partnerProjectSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'project',
	});
	next();
});

const partnerProjects = mongoose.model('PartnerProjects', partnerProjectSchema);
module.exports = partnerProjects;
