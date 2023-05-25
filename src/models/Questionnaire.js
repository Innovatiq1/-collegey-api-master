import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const questionnaireSchema = new mongoose.Schema(
	{
		ted_talk: String,
		student: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		teaching_skill: String,
		learning_skill: String,
		impact: String,
		interview_media_house: String,
		work_title: String,
		city_country: String,
		status: {
			type: Number,
			enum: Object.values(statusTypesEnum.toJSON()),
			default: statusTypes.ACTIVE,
		},
	},
	MongoSchemaAddOn
);
questionnaireSchema.plugin(mongoosePaginate);
questionnaireSchema.set('toJSON', { getters: true, virtuals: false });
const questionnaire = mongoose.model('Questionnaires', questionnaireSchema);
module.exports = questionnaire;
