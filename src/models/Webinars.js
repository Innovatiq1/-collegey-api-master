import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';

const webinarSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		tags: [{ type: String }],
		video_url: String,
		image: String,
		date: Date,
		is_paid: Boolean,
		cost: Number,
		slug: { type: String, lowercase: true, unique: true, index: true },
		status: {
			type: Number,
			enum: Object.values(statusTypesEnum.toJSON()),
			default: statusTypes.ACTIVE,
		},
	},
	MongoSchemaAddOn
);
webinarSchema.plugin(urlSlug('title'));
webinarSchema.plugin(mongoosePaginate);

const Webinars = mongoose.model('Webinars', webinarSchema);
module.exports = Webinars;
