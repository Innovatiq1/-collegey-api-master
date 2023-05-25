import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../../utilities/constants';
import { statusTypes } from '../../utilities/constant_variables';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection'; 

const billingSchema = new mongoose.Schema(
	{
		mainUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		stripeCustomerId: { type: String },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		createdAt: {type: Date,required: true,default: Date.now,},
		updatedAt: {type: Date,required: true,default: Date.now,},
		isDeleted: { type: Boolean, default: false },
	},
	MongoSchemaAddOn
);
billingSchema.plugin(mongoosePaginate);

const BillingSchema  = mongoose.model('Billing', billingSchema);
module.exports = BillingSchema;
