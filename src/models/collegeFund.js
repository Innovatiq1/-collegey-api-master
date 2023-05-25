import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const collegeFundSchema = new mongoose.Schema(
	{
		
		name: String,
		email: String,
		city:String,
		mobile: String,
		countryCode: String,
	    country: String,
		fundAmount: Number,
		status: {
			type: Number,
			enum: Object.values(statusTypesEnum.toJSON()),
			default: statusTypes.ACTIVE,
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

collegeFundSchema.plugin(mongoosePaginate);

const CollegeFund = mongoose.model('CollegeFund', collegeFundSchema);
module.exports = CollegeFund;
