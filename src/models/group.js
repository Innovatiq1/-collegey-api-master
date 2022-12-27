const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
	{
		groupName: {
			type: String,
			unique: true,
			required: [true, 'Group Should have a name'],
		},
		groupOwner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		description: {
			type: String,
			default: 'No description found',
		},
		userAdmin: {
			type: String,
			default: 'No description found',
		},
		groupIcon: {
			type: String,
			default: 'groupIconDefault.jpg',
		},
		groupBanner: {
			type: String,
			default: 'groupBannerDefault.jpg',
		},
		rules: {
			type: String,
			default: 'No rules found',
		},
		groupType: {
			type: String,
			default: 'public',
			enum: ['private', 'public'],
		},
		groupJoinRequest: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'User',
		},
		// List of users
		userList: {
			type: [
				{
					user: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'User',
					},
					userType: {
						type: String,
					},
				},
			],
		},

		//Captures date and time when Object is created and is used for sorting by date created
		createdAt: {
			type: Date,
			default: Date.now,
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Populate middleware function
groupSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'userList.user',
		select: 'name',
	});

	next();
});
groupSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'groupJoinRequest',
		select: 'name',
	});

	next();
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
