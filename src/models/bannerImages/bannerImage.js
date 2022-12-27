import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../../utilities/constants';
import { statusTypes } from '../../utilities/constant_variables';


const bannerImageSchema = new mongoose.Schema(
	{
		bannerFor: { type: String,required: true},
		imagePath: { type: String,required: true},
        isDeleted: { type: Boolean, default: false},
        isActivated: { type: Boolean, default: false}
	},
	MongoSchemaAddOn
);
bannerImageSchema.plugin(mongoosePaginate);

const BannerImage = mongoose.model('BannerImage', bannerImageSchema);
module.exports = BannerImage;
