import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';

const faqCategorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true},
		position: { type: Number, required: true},
	},
	MongoSchemaAddOn
);
faqCategorySchema.plugin(mongoosePaginate);

const BannerImage = mongoose.model('faqCategories', faqCategorySchema);
module.exports = BannerImage;
