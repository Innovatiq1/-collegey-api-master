const mongoose = require('mongoose');

const paidProjects = new mongoose.Schema(
	{
		// User Reference Object
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			unique: true,
			required: [true, 'paidProject must belong to a User!'],
		},

		// List of project, user is watching
		paidProject: {
			type: [
				{
					project: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'Projects',
					},
				},
			],
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
paidProjects.pre(/^find/, function(next) {
	this.populate({
		path: 'paidProject',
	});
	next();
});

const paidProject = mongoose.model('paidProject', paidProjects);

module.exports = paidProject;
