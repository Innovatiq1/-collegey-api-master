import mongoose from 'mongoose';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';

const citySchema = new mongoose.Schema({
    id:{ type: Number},
    name: {type: String},
    state_id: {type: Number},
    state_code:{type: String},
    country_id: {type: Number},
    country_code: {type: String},
    status: {
        type: Number,
        enum: Object.values(statusTypesEnum.toJSON()),
        default: statusTypes.ACTIVE
    },
    custom_order:{
        type: Number
    }
});


const City = mongoose.model('City', citySchema);
module.exports = City;