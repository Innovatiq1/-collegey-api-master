import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const investProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
    country: String,
    organisation : String
},MongoSchemaAddOn);
investProfileSchema.plugin(mongoosePaginate);

const InvestProfile = mongoose.model('InvestProfile', investProfileSchema);
module.exports = InvestProfile;