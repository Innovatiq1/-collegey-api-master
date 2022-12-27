const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
	{
		//User Reference Object
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			unique: true,
			required: [true, 'Follow must belong to a User!'],
		},

		// List of users, user is following
		followingList: {
			type: [
				{
					user: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'User',
					},
				},
			],
		},

		// List of followers user has
		followerList: {
			type: [
				{
					user: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'User',
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
followSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		select: 'name',
	})
		.populate({
			path: 'followerList.user',
			select: 'name',
		})
		.populate({
			path: 'followingList.user',
			select: 'name',
		});
	next();
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
