import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const rewardspointSchema = new mongoose.Schema(
	{
		rewardName: {
			type: String,
			required: true,
		},
		uniqueId:{
			type: String
		},
		rewardCreditPoint: {
			type: Number,
			required: true,
            default: 0.00,
		},
		rewardDebitPoint: {
			type: Number,
			required: true,
            default: 0.00,
		},
		user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required to add rewards points!'],
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

rewardspointSchema.plugin(mongoosePaginate);
rewardspointSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user_id',
	});
	next();
});
const RewardsPoint = mongoose.model('RewardsPoint', rewardspointSchema);
module.exports = RewardsPoint;
