import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const careerProfileSchema = new mongoose.Schema(
	{
		name: String,
		emailId: String,
		city: String,
		countryCode: String,
		country: String,
		cellNumber: String,
		linkedinId: String,
		expertise: String,
		workTitle: String,
		outcome: String,
		resume: String,
	},
	MongoSchemaAddOn
);
careerProfileSchema.plugin(mongoosePaginate);

const Blogs = mongoose.model('CareerProfile', careerProfileSchema);
module.exports = Blogs;
