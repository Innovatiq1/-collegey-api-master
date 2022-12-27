import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const projectFeeSchema = new mongoose.Schema(
    {
        title: {type: String},
        fees_type: {type: String},
        default_price: { type: Number},
        maximum_price: { type: Number},
        minimum_price: { type: Number},
        isDeleted: { type: Boolean, default: false},
        createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
    },
);
projectFeeSchema.plugin(mongoosePaginate);

const projectFees = mongoose.model('ProjectFees', projectFeeSchema);
module.exports = projectFees;
