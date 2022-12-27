import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const privacyPolicySchema = new mongoose.Schema(
	{
		description: String,
		activeStatus: String,
		image: String,
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

privacyPolicySchema.plugin(mongoosePaginate);

const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);
module.exports = PrivacyPolicy;
