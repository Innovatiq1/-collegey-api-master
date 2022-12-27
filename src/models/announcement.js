const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
	{
		announcementType: {
			type: String,
			enum: ['project', 'feed'],
			required: [true, 'Please select announcement type'],
		},
		forStudents: {
			type: Boolean,
		},
		forMentors: {
			type: Boolean,
		},
		isActive: {
			type: Boolean,
			deafult: true,
		},
		subject: {
			type: String,
			required: [true, 'Please fill a announcement subject'],
		},
		details: {
			type: String,
			required: [true, 'Please fill a announcement details'],
		},
		announcementBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		//Captures date and time when Object is created and is used for sorting by date created
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		active: {
			type: Boolean,
			default: true,
		},

	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Populate middleware function
announcementSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'announcementBy',
		select: 'name',
	});

	next();
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
