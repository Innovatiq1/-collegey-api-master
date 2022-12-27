import mongoose from 'mongoose';
import { statusTypesEnum } from '../utilities/constants';
const mongoosePaginate = require('mongoose-paginate-v2');
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
const userProjectSchema = new mongoose.Schema(
	{
		project_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Projects',
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		role: {
			type: Number,
			enum: [1, 2],
			default: 1,
		},
		access: {
			type: Number,
			enum: [1, 2, 3],
			default: 1,
		},
		collaborators: {
			type: mongoose.Schema.Types.Mixed,
		},
		certificateUrl: {
			type: String,
			default: null
		},
		paymentType: {
			type: String,
			default: null
		},
		paymentAmount: {
			type: String
		},
		status: {
			type: Number,
			enum: Object.values(statusTypesEnum.toJSON()),
			default: statusTypes.ACTIVE,
		},
	},
	MongoSchemaAddOn
);
userProjectSchema.index({project_id:mongoose.Schema.Types.ObjectId,user_id:mongoose.Schema.Types.ObjectId});
userProjectSchema.virtual('student', {
	ref: 'User',
	localField: 'user_id',
	foreignField: '_id',
	justOne: true,
	select: 'name',
});
userProjectSchema.virtual('project', {
	ref: 'Projects',
	localField: 'project_id',
	foreignField: '_id',
	justOne: true,
	select: 'title',
});
userProjectSchema.plugin(mongoosePaginate);
const UserProjects = mongoose.model('user_projects', userProjectSchema);
module.exports = UserProjects;
