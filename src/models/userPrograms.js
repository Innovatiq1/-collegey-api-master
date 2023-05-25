import mongoose from 'mongoose';
import { statusTypesEnum } from '../utilities/constants';
const mongoosePaginate = require('mongoose-paginate-v2');
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
const userProgramSchema = new mongoose.Schema(
	{
		program_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Progrms',
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
		programStatus: {
			type: String,
			enum: ['InProgress', 'Completed']
		},
		status: {
			type: Number,
			enum: Object.values(statusTypesEnum.toJSON()),
			default: statusTypes.ACTIVE,
		},
	},
	MongoSchemaAddOn
);
userProgramSchema.index({program_id:mongoose.Schema.Types.ObjectId,user_id:mongoose.Schema.Types.ObjectId});
userProgramSchema.virtual('student', {
	ref: 'User',
	localField: 'user_id',
	foreignField: '_id',
	justOne: true,
	select: 'name',
});
userProgramSchema.virtual('program', {
	ref: 'Programs',
	localField: 'program_id',
	foreignField: '_id',
	justOne: true,
	select: 'title',
});
userProgramSchema.plugin(mongoosePaginate);
const UserPrograms = mongoose.model('user_programs', userProgramSchema);
module.exports = UserPrograms;
