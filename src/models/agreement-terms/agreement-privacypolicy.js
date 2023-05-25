import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection'; 

const agreementPrivacyPolicySchema = new mongoose.Schema(
	{
		title: { type: String,required: true},
		description: { type: String,required: true},
		createdAt: {type: Date,required: true,default: Date.now,},
		updatedAt: {type: Date,required: true,default: Date.now,},
		isDeleted: { type: Boolean, default: false },  
	},
	MongoSchemaAddOn
);
agreementPrivacyPolicySchema.plugin(urlSlug('title')); 
agreementPrivacyPolicySchema.plugin(mongoosePaginate);

const AgreementPrivacyPolicy  = mongoose.model('AgreementPrivacyPolicy', agreementPrivacyPolicySchema);
module.exports = AgreementPrivacyPolicy;
