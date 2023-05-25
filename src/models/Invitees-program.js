import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';


const inviteeProgramSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},  
		requestedForName: { type: String },
		
		requestedForUserId: { 
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
			
		programID: { type: String },
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		
	},
	MongoSchemaAddOn
);
inviteeProgramSchema.plugin(mongoosePaginate);

const InviteeProgram = mongoose.model('InviteeProgram', inviteeProgramSchema);
module.exports = InviteeProgram;
