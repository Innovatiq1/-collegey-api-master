import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../../utilities/constants';
import { statusTypes } from '../../utilities/constant_variables';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection'; 

const agreementSchema = new mongoose.Schema(
	{
		title: { type: String,required: true},
		description: { type: String,required: true},
		type_policy: { type: String,required: true},
		createdAt: {type: Date,required: true,default: Date.now,},
		updatedAt: {type: Date,required: true,default: Date.now,},
		isDeleted: { type: Boolean, default: false },  
	},
	MongoSchemaAddOn
);
agreementSchema.plugin(urlSlug('title')); 
agreementSchema.plugin(mongoosePaginate);

const AgreementTerms  = mongoose.model('AgreementTerms', agreementSchema);
module.exports = AgreementTerms;
