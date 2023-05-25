import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const redeemSettingSchema = new mongoose.Schema(
    {
        redeemed_allow: {type: String},
		redeemed_value: {type: String},
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
redeemSettingSchema.plugin(mongoosePaginate);

const redeemReward = mongoose.model('redeemSetting', redeemSettingSchema);
module.exports = redeemReward;
