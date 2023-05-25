const mongoose = require('mongoose');

const watchlistForStudentProjectSchema = new mongoose.Schema(
	{
		// User Reference Object
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			unique: true,
			required: [true, 'watchlist must belong to a User!'],
		},

		// List of project, user is watching
		watchlist: {
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
watchlistForStudentProjectSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		select: 'name',
	});
	// project population in seperate route
	next();
});

const watchlistForStudentProject = mongoose.model(
	'watchlistForStudentProject',
	watchlistForStudentProjectSchema
);

module.exports = watchlistForStudentProject;
