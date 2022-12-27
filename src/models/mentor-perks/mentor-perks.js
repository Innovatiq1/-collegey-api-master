import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../../utilities/constants';
import { statusTypes } from '../../utilities/constant_variables';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection'; 

const mentorPerksSchema = new mongoose.Schema(
	{
		title: { type: String,required: true},
		featured: { type: String,required: true},
		short_description: { type: String,required: true},
		description: { type: String,required: true},
		image: { type: String},
		slug: { type: String, lowercase: true, unique: true, index: true },
		tags: [{ type: String }],
		favorite: [{ type: mongoose.Schema.Types.ObjectId}],		
		createdAt: {type: Date,required: true,default: Date.now,},
		updatedAt: {type: Date,required: true,default: Date.now,},
		isDeleted: { type: Boolean, default: false },  
	},
	MongoSchemaAddOn
);
mentorPerksSchema.plugin(urlSlug('title')); 
mentorPerksSchema.plugin(mongoosePaginate);


const MentorPerks = mongoose.model('MentorPerks', mentorPerksSchema);
module.exports = MentorPerks;
