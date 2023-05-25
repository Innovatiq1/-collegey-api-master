import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';

const educationPlansSchema = new mongoose.Schema(
	{
		
		type: { type: String },
		
		// userOwner: { 
		// 	type: mongoose.Schema.ObjectId,
		// 	ref: 'User',
		// },
		userOwner: {type: String},
	  
		
		test_info: [
			{
				
				_id: false,
				test_name: {type: String},
				other_text: {type: String},
				test_status: {
					type: String,
					enum: ['taken', 'planned'],
				},
				current_score: {type: String}
				
			}
		]
	},
	MongoSchemaAddOn
);
educationPlansSchema.plugin(mongoosePaginate);

const studentEducationPlans = mongoose.model('studentEducationPlans', educationPlansSchema);
module.exports = studentEducationPlans;
