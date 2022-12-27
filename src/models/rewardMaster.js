import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const rewardMasterSchema = new mongoose.Schema(
	{
		rewardName: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	MongoSchemaAddOn
);

rewardMasterSchema.plugin(mongoosePaginate);

const RewardMaster = mongoose.model('RewardMaster', rewardMasterSchema);
module.exports = RewardMaster;
