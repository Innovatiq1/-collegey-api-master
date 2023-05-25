import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import { statusTypesEnum } from '../../utilities/constants';
import { statusTypes } from '../../utilities/constant_variables';

const HomeDataSchema = new mongoose.Schema(
	{
		home_intro_first_sec_title: { type: String },
		// first_sec_ecosytem: [
		// 	{ 
		// 		name: {type: String},
		// 		status:  { type: Boolean, default: false },
		// 	}, 
		// ],
		home_second_section: [{
			mainTitle: { type: String },
			backgroundImg: { type: String },
			sectionData: [{
				title: { type: String },
				description: { type: String },
				status: { type: Boolean, default: false },
			}]
		}],
		home_third_section: [{
			mainTitle: { type: String },
			subTitle: { type: String },
			bottomTitle: { type: String },
			bottomButtonText: { type: String },
			bottomButtonLink: { type: String },
			videoData: [{
				title: { type: String },
				videoLink: { type: String },
				layerImg: { type: String },
				status: { type: Boolean, default: false },
			}]
		}],
		home_first_section: [
			{
				bannerText: { type: String },
				bannerSubText: { type: String },
				bannerImg: { type: String },
				midleTitle: { type: String },
				status: { type: Boolean, default: false },
			},
		],
		home_fifth_section: [
			{
				title: { type: String },
				bottomTitle: { type: String },
				bottomButton: [{
					text: { type: String },
					link: { type: String },
				}],
				sectionData: [{
					text: { type: String },
					sectionImg: { type: String },
					status: { type: Boolean, default: false },
				}]
			},
		],
		home_fourth_section: [
			{
				title: { type: String },
				subtitle: { type: String },
				imagePath: { type: String },
				status: { type: Boolean, default: false },
			},
		],

		home_second_sec_title: { type: String },
		home_second_sec_data: [
			{
				name: { type: String },
				description: { type: String },
				imagePath: { type: String },
				status: { type: Boolean, default: false },
			},
		],

		home_intro_third_sec_title: { type: String },
		partnerships_come_together: [
			{
				name: { type: String },
				status: { type: Boolean, default: false },
			},
		],

		home_intro_fourth_sec_title: { type: String },
		home_fourth_sec_data: [
			{
				name: { type: String },
				imagePath: { type: String },
				status: { type: Boolean, default: false },
			},
		],

		home_intro_sixth_sec_title: {type: String},
		home_sixth_sec_data: [
			{ 
				name: {type: String},
				description: {type: String},
				imagePath: {type: String},
				buttonText: {type: String},
				buttonLink: {type: String},				
			}, 
		],

		home_bottom_first_slide_data: [
			{
				name: { type: String },
				imagePath: { type: String },
				status: { type: Boolean, default: false },
			},
		],

		home_bottom_second_slide_data: [
			{
				name: { type: String },
				imagePath: { type: String },
				status: { type: Boolean, default: false },
			},
		],

		home_footer_section: [
			{
				address1: { type: String },
				address1email: { type: String },
				address1phone: { type: String },

				address2: { type: String },
				address2email: { type: String },
				address2phone: { type: String },
				copyright: { type: String },
				imagePath: { type: String },
				status: { type: Boolean, default: false },
			},
		],

		program_content_section: [
			{
				title: { type: String },
				program_content: { type: String },
				button_text: { type: String },
				button_link: { type: String },
				imagePath: { type: String },
				status: { type: Boolean, default: false },
			},
		],

		createdAt: { type: Date, required: true, default: Date.now, },
		updatedAt: { type: Date, required: true, default: Date.now, },
		isDeleted: { type: Boolean, default: false },
	},
	MongoSchemaAddOn
);
HomeDataSchema.plugin(mongoosePaginate);

const HomeContent = mongoose.model('homecontent', HomeDataSchema);
module.exports = HomeContent;
