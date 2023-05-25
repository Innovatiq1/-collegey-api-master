import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const conferenceSchema = new mongoose.Schema(
	{
		title: String,
		short_description: String,
		description: String,
		image: String,
		redirect_link: String,
		is_paid: Boolean,
		cost: Number,
		slug: { type: String, lowercase: true, unique: true, index: true },
		tags: [{ type: String }],
		status: {
			type: Number,
			enum: Object.values(statusTypes),
			default: statusTypes.ACTIVE,
		},
	},
	MongoSchemaAddOn
);
conferenceSchema.plugin(urlSlug('title'));
conferenceSchema.plugin(mongoosePaginate);

const Conferences = mongoose.model('Conferences', conferenceSchema);
module.exports = Conferences;
