import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';

const inviteeSchema = new mongoose.Schema(
	{
		type: { type: String },
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},  
		referemail: { type: String },
		activation_code: { type: String },
		isActive: { type: Boolean, default: false },
		firstName: { type: String },
		lastName: { type: String },
		status: { type: String },
		other: { type: String },
		linkedIn: { type: String },
		cellNumber: { type: Number },
	},
	MongoSchemaAddOn
);
inviteeSchema.plugin(mongoosePaginate);

const Invitees = mongoose.model('InviteJoinee', inviteeSchema);
module.exports = Invitees;
