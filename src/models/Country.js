import mongoose from 'mongoose';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';

const countrySchema = new mongoose.Schema({
    id:{ type: Number},
    name: {type: String},
    iso3: {type: String},
    iso2: {type: String},
    phone_code: {type: String},
    capital: {type: String},
    currency: {type: String},
    status: {
        type: Number,
        enum: Object.values(statusTypesEnum.toJSON()),
        default: statusTypes.ACTIVE
    },
    custom_order:{
        type: Number
    }
});


const Country = mongoose.model('Country', countrySchema);
module.exports = Country;