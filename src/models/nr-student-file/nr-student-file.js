import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../../utilities/constants';
import { statusTypes } from '../../utilities/constant_variables';

const studentResourcesSchema = new mongoose.Schema(
	{
		title: { type: String,required: true},
		description: { type: String,required: true},
		fileName: { type: String,required: true},
		fileType: { type: String,required: true},
		file: { type: String,required: true},
		createdAt: {type: Date,required: true,default: Date.now,},
		updatedAt: {type: Date,required: true,default: Date.now,},
		isDeleted: { type: Boolean, default: false },  
	},
	MongoSchemaAddOn
);
studentResourcesSchema.plugin(mongoosePaginate);

const StudentResource = mongoose.model('NrStudentFile', studentResourcesSchema);
module.exports = StudentResource;
