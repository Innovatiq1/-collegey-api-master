import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';


const studentSubjectSchema = new mongoose.Schema(
	{
		subject: {
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
studentSubjectSchema.plugin(mongoosePaginate);

const studentSubjects = mongoose.model('studentSubjects', studentSubjectSchema);
module.exports = studentSubjects;
