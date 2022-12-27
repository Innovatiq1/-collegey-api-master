import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../../utilities/constants';
import { statusTypes } from '../../utilities/constant_variables';

const mentorResourcesSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId}, 
		description: { type: String,required: true},
		status:{ type: String,required: true},
		createdAt: {type: Date,required: true,default: Date.now,},
		updatedAt: {type: Date,required: true,default: Date.now,},
		isDeleted: { type: Boolean, default: false },  
	},
	MongoSchemaAddOn
);
mentorResourcesSchema.plugin(mongoosePaginate);

const MentorResource = mongoose.model('Sharetestestimonial', mentorResourcesSchema);
module.exports = MentorResource;
