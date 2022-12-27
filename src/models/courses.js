import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const Courses = new mongoose.Schema(
	{
		title: String,
		short_description: String,
		description: String,
		redirect_link: String,
		is_paid: Boolean,
		cost: Number,
		slug: { type: String, lowercase: true, unique: true, index: true },
		image: String,
		tags: [{ type: String }],
		status: {
			type: Number,
			enum: Object.values(statusTypesEnum.toJSON()),
			default: statusTypes.ACTIVE,
		},
		externalLink:{type:String ,default:'#'}
	},
	MongoSchemaAddOn
);
Courses.plugin(urlSlug('title'));
Courses.plugin(mongoosePaginate);

// const Courses = 
module.exports = mongoose.model('courses', Courses);
