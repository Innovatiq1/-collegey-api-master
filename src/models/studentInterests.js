import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';


const studentInterestsSchema = new mongoose.Schema(
	{
		interest: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},  
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
studentInterestsSchema.plugin(mongoosePaginate);

const studentInterests = mongoose.model('studentInterests', studentInterestsSchema);
module.exports = studentInterests;
