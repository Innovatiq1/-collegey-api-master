import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../../utilities/constants';
import { statusTypes } from '../../utilities/constant_variables';


const universitySchema = new mongoose.Schema(
	{
		name: { type: String,required: true},
		weblink: { type: String,required: true},
		description:{type: String,required: true},
		imagePath:{type: String,required: true},
        isDeleted: { type: Boolean, default: false},
        isActivated: { type: Boolean, default: false},
		mentorFollow:{
			type: [
				{
					user: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'User',
					},
				},
			],
		},
		Followcount: {
			type: Number,
			default: 0,
		},
	},
	MongoSchemaAddOn
);
universitySchema.plugin(mongoosePaginate);

const university = mongoose.model('university', universitySchema);
module.exports = university;
