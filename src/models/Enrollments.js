import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const enrollmentSchema = new mongoose.Schema({
    program_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Programs'
    },
    name: String,
    email:String,
    mobile: Number,
    profile: String,
    price: Number,
    country: Number,
    city:Number,
    duration:String,
    payment_status:String
},MongoSchemaAddOn);
enrollmentSchema.plugin(urlSlug('title'));
enrollmentSchema.plugin(mongoosePaginate);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;