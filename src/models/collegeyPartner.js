import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const collegeyPartnerSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
    country: String,
    organisation : String,
    bestText : String
},MongoSchemaAddOn);
collegeyPartnerSchema.plugin(mongoosePaginate);

const CollegeyPartner = mongoose.model('CollegeyPartner', collegeyPartnerSchema);
module.exports = CollegeyPartner;