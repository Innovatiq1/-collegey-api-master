/* eslint-disable node/no-unsupported-features/es-syntax */
import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
// import { statusTypesEnum } from '../utilities/constants';
const mongoosePaginate = require('mongoose-paginate-v2');
// import { statusTypes } from '../utilities/constant_variables';

const userProjectWatchlistSchema = new mongoose.Schema(
	{
		project_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Projects',
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	MongoSchemaAddOn
);

userProjectWatchlistSchema.virtual('student', {
	ref: 'User',
	localField: 'user_id',
	foreignField: '_id',
	justOne: true,
	// select: 'name',
});
userProjectWatchlistSchema.virtual('project', {
	ref: 'Projects',
	localField: 'project_id',
	foreignField: '_id',
	justOne: true,
	// select: 'title',
});

userProjectWatchlistSchema.plugin(mongoosePaginate);
const UserProjectsWatchlist = mongoose.model('user_watchlist', userProjectWatchlistSchema);
module.exports = UserProjectsWatchlist;
