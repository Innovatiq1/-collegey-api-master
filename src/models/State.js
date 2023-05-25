import mongoose from 'mongoose';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';

const stateSchema = new mongoose.Schema({
    id:{ type: Number},
    name: {type: String},
    country_id: {type: Number},
    country_code: {type: String},
    state_code: {type: String},
    status: {
        type: Number,
        enum: Object.values(statusTypesEnum.toJSON()),
        default: statusTypes.ACTIVE
    },
    custom_order:{
        type: Number
    }
});


const State = mongoose.model('State', stateSchema);
module.exports = State;