import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const subscriptionSchema = new mongoose.Schema({
    emailId: String,
    status : String
},MongoSchemaAddOn);
subscriptionSchema.plugin(mongoosePaginate);

const Subscriptions = mongoose.model('Subscriptions', subscriptionSchema);
module.exports = Subscriptions;