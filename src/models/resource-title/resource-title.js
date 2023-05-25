import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../../utilities/constants';
import { statusTypes } from '../../utilities/constant_variables';

const ResourcesTitleSchema = new mongoose.Schema(
	{
		mentorResourcesTitle: { type: String, required: true },
		mentorFavoriteArticlesTitle: { type: String, required: true },
		mentorCuratedRsourcesTitle: { type: String, required: true },
		mentorResourceFileTitle: { type: String, required: true },
		studentResourcesTitle: { type: String, required: true },
		studentFavoriteArticlesTitle: { type: String, required: true },
		studentCuratedRsourcesTitle: { type: String, required: true },
		studentResourceFileTitle: { type: String, required: true },
		createdAt: { type: Date, required: true, default: Date.now },
		updatedAt: { type: Date, required: true, default: Date.now },
		isDeleted: { type: Boolean, default: false },
	},
	MongoSchemaAddOn
);
ResourcesTitleSchema.plugin(mongoosePaginate);

const ResourceTitle = mongoose.model('ResourceTitle', ResourcesTitleSchema);
module.exports = ResourceTitle;
