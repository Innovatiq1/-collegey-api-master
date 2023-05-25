import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
const invitationSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		emails: [{ type: String }],
		message: String,
		status: {
			type: Number,
			enum: Object.values(statusTypes),
			default: statusTypes.ACTIVE,
		},
	},
	MongoSchemaAddOn
);

invitationSchema.virtual('counsellor', {
	ref: 'User',
	localField: 'user_id',
	foreignField: '_id',
	justOne: true,
	select: 'name',
});
invitationSchema.plugin(mongoosePaginate);
const Invitations = mongoose.model('invitation', invitationSchema);
module.exports = Invitations;
