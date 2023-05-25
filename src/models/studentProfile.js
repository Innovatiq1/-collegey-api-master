/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/es-syntax */
import mongoose from 'mongoose';

import { node_decrypt, node_encrypt } from '../utilities/encryption';

const counselorSchema = new mongoose.Schema({
	_id: false,
	id: false,
	name: {
		type: String,
		// set: node_encrypt,
		// get: node_decrypt,
	},
	email: {
		type: String,
		// set: node_encrypt,
		// get: node_decrypt,
	},
	phone_number: {
		extension: {
			type: String,
			set: node_encrypt,
			get: node_decrypt,
		},
		number: {
			type: String,
			set: node_encrypt,
			get: node_decrypt,
		},
	},
	designation: {
		type: String,
	},
	privacy: {
		type: String,
	},
});
counselorSchema.set('toObject', { getters: true });
counselorSchema.set('toJSON', { getters: true });

const studentProfileSchema = new mongoose.Schema({
	geography: {
		country: Number,
		state: Number,
		city: Number,
		citizenship: String,
		timezone: String,
		is_completed: Boolean,
	},
	history: {
		education: [
			{
				type: { type: String, enum: ['School', 'College'] },
				name: String,
				current_class: String,
				locationCity: String,
				locationState: String,
				locationCountry: String,
				board: String,
				other_board: String,
				field_of_study: [{ type: String }],
				degree: String,
				start_year: Number,
				end_year: Number,
				score: { type: mongoose.Schema.Types.Mixed },
			},
		],
		is_completed: Boolean,
	},
	history_updated: {
		education: [
			{ 
				type: { type: String, enum: ['School', 'College'] },
				name: String,
				locationCity: String,
				locationState: String,
				locationCountry: String,
				grade_choosen: [{ type: String }],
				grade: [
					{ 
						name: Number,
						board: String,
						scoreType: String,
						other_board: String,
						field_of_study: [{ type: String }],
						start_year: Number,
						end_year: Number,
						score: {
							type: ["integer", "string"]
						},
						tbd: Boolean,
						transcript: String,
						school_fileName: String,
					}, 
				],
				year_choosen: [{ type: String }],
				collegegrade: [ 
					{ 
						name: String,
						field_of_study: [{ type: String }],
						score: {
							type: ["integer", "string"]
						},
						stdyear: Number,
						transcript: String,
						scoreType: String,
						college_fileName: String,
						tbd: Boolean,
					},
				],
				degree: String,
				start_year: Number,
				end_year: Number,
			},
		],
		//curious_about: String,
		is_completed: Boolean,
	},
	interest: {
		interest_area: [{ type: String }],
		fav_subjects: [{ type: String }],
		key_problems: { type: String },
		secondkey_problems: { type: String },
		improve_projects: { type: String },
		is_completed: Boolean,
	},
	know_you_better: {
		people_who_inspire_you: [
			{
				_id: false,
				name: String,
			},
		],
		fav_books: [
			{
				_id: false,
				name: String,
			},
		],
		fav_movies: [
			{
				_id: false,
				name: String,
			},
		],
		fav_websites1: { type: String },
		fav_websites2: { type: String },
		fav_websites3: { type: String },
		//fav_activity_on_internet: String,
		fav_message_service: [{ type: String }],
		fav_websites: [
			{
				_id: false,
				name: String,
			},
		],
		is_completed: Boolean,
	},
	projects: {
		any_bpp: {
			answer: String,
			title: String,
			description: String,
		},
		describe_any_project: [
			{
				title: String,
				description: String,
				project_url: String,
			},
		],
		writing_sample: [
			{
				answer: String,
				title: String,
				description: String,
				file: [{ type: String }],
			},
		],
		someone_said_something_or_recommendation: [
			{
				title: String,
				description: String,
				file: [{ type: String }],
			},
		],
		award: [
			{
				type: {
					type: String,
					enum: [
						'awards',
						'certificates',
						'participations',
						'internship',
						'volunteer_experience',
						'online_learning',
					],
				},
				title: String,
				issuing_organisation: String,
				role: String,
				duration: [{ type: String }],
				description: String,
				file: [{ type: String }],
			},
		],
		is_completed: Boolean,
	},
	
	headed: {
		expected_year_to_start: {
			grade: String,
			other_degree: String,
			preferred_countries: [{  item_id: Number, item_text:String}],
			year: String,
			
		}, 
		test_info: [
			{
				_id: false,
				test_name: String,
				other_text: String,
				test_status: {
					type: String,
					enum: ['taken', 'planned'],
				},
				current_score: String,
				test_date: Date,
			},
		],
		institutes_Wishlist: [
			{
				institute_name: String
			}			
		],
		preferred_countries: [
			{ 
				item_id: Number, 
				item_text: String 
			}
		],
		wish_to_study: [
			{
				grade: {
					type: String,
					enum: ['ug', 'pg'],
				},
				subjects: String,
				other_text: String,
				majors: String,
			},
		],
		is_completed: Boolean,
	},
	prefrences: {
		interested_in_gap: String,
		how_would_like_to_pay: String,
		wish_to_apply_for_scholarships: {
			answer: Boolean,
			imoprtance: String,
		},
		family_income: String,
		is_completed: Boolean,
		privacy: String,
		future_privacy: String,
	},
	ways_to_be_in_touch: {
		dob: Date,
		age: String,
		phone_number: {
			extension: {
				type: String,
			},
			number: {
				type: String,
			},
		},
		parents_details: {
			_id: false,
			name: {
				type: String,
				// set: node_encrypt,
				// get: node_decrypt,
			},
			email: {
				type: String,
				// set: node_encrypt,
				// get: node_decrypt,
			},
			phone_number: {
				extension: {
					type: String,
					// set: node_encrypt,
					// get: node_decrypt,
				},
				number: {
					type: String,
					// set: node_encrypt,
					// get: node_decrypt,
				},
			},
			occupation: {
				type: String,
			},
			relation: {
				type: String,
				enum: ['father', 'mother', 'guardian', 'other'],
			},
			relation_with_guardian: String,
			privacy: { type: String },
		},
		school_counselor: [counselorSchema],
		social_media: { type: mongoose.Schema.Types.Mixed },
		is_completed: Boolean,
	},
});
studentProfileSchema.set('toObject', { getters: true, setters: true }, 'toJSON', {
	getters: true,
	setters: true,
});
module.exports = studentProfileSchema;
