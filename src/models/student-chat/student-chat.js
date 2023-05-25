import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../../utilities/constants';
import { statusTypes } from '../../utilities/constant_variables';

const mentorResourcesSchema = new mongoose.Schema(
	{
		senderuser: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		receiveruser: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		chatmessage: [
			{
				msgText: {type: String},
				mediafiletype: {type: String},
				msgType : {type: String}, 
				userid: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
				},
				createdAt: {type: Date,required: true,default: Date.now,},
			}
		],
		createdAt: {type: Date,required: true,default: Date.now,},
		updatedAt: {type: Date,required: true,default: Date.now,},
		isDeleted: { type: Boolean, default: false },  
	},
	MongoSchemaAddOn
);
mentorResourcesSchema.plugin(mongoosePaginate);

const MentorResource = mongoose.model('StudentChat', mentorResourcesSchema);
module.exports = MentorResource;
