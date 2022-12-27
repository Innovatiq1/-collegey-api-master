import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const blogSchema = new mongoose.Schema(
	{
		title: String,
		short_description: String,
		description: String,
		image: String,
		author: String,
		redirect_link: String,
		is_paid: Boolean,
		cost: Number,
		slug: { type: String, lowercase: true, unique: true, index: true },
		tags: [{ type: String }],
		status: {
			type: Number,
			enum: Object.values(statusTypesEnum.toJSON()),
			default: statusTypes.ACTIVE,
		},
		blogComments: [
			{
				user: {type: mongoose.Schema.Types.ObjectId},
				name: {type: String},
				email: {type: String},
				comment: { type: String },
				createdAt: {type: Date},
				reply: [
					{
						user: {type: mongoose.Schema.Types.ObjectId},
						name: {type: String},
						email: {type: String},
						comment: { type: String },
						avatar: { type: String },
						createdAt: {type: Date},
					}
				]
			},
		],
		// editorPick: { type: Boolean, default: false },
	},
	MongoSchemaAddOn
);
blogSchema.plugin(urlSlug('title'));
blogSchema.plugin(mongoosePaginate);

const Blogs = mongoose.model('Blogs', blogSchema);
module.exports = Blogs;
