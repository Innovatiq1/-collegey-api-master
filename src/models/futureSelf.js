import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';


const futureSelfSchema = new mongoose.Schema(
	{
		UserId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			
		},
		answerArray: [
			{
				Answer: {type: String,required: true,trim: true},
				responseLable: {type: String,trim: true},
				Question: {type: String,required: true,trim: true},
				questionId: {type: mongoose.Schema.ObjectId,ref: 'User'},
				createdAt: {type: Date,default: Date.now},   
			}
		],
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
futureSelfSchema.plugin(mongoosePaginate);

const futureSelf = mongoose.model('futureSelf', futureSelfSchema);
module.exports = futureSelf;
