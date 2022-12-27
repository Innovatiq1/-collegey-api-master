import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const universitylogoSchema = new mongoose.Schema(
	{
		
		activeStatus: String,
		imageName: String,
		location: String,
		title: String,
		status: {
			type: Number,
			enum: Object.values(statusTypesEnum.toJSON()),
			default: statusTypes.ACTIVE,
		},
		active: {
			type: Boolean,
			default: false,
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

universitylogoSchema.plugin(mongoosePaginate);

const UniversityLogo = mongoose.model('UniversityLogo', universitylogoSchema);
module.exports = UniversityLogo;
