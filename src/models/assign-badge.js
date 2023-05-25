import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const assignBadgeSchema = new mongoose.Schema(
	{
		
		userType:String, 
		badgeId: {
			type: mongoose.Schema.ObjectId,
			ref: 'BadgeMaster',
			required: [
				true,
				'Please select badge for assign badge',
			],
		},
		assignUserId: {
			type:  mongoose.Schema.ObjectId,
			ref: 'User',
			required: [
				true,
				'Assign User needs to a assign badge | please select user',
			],
		},
		active: {
			type: Boolean,
			default: false,
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

assignBadgeSchema.plugin(mongoosePaginate);
assignBadgeSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'badgeId',
	});
	this.populate({
		path: 'assignUserId',
	});
	next();
});
const AssignBadge = mongoose.model('AssignBadge', assignBadgeSchema);
module.exports = AssignBadge;
