/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/es-syntax */
// User Model
import urlSlug from 'mongoose-url-slugs';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import studentProfileSchema from './studentProfile';
import mentorProfileSchema from './mentorProfileSchema'
import { getProfileCompletion, getMentorProfileCompletion } from '../utilities/helpers';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'mixed'],
			default: 'male',
		},
		phone_number: [
			{
				_id: false,
				extension: {
					type: String,
					default: '+91',
				},
				number: {
					type: String,
				},
				tag: {
					type: String,
					enum: ['primary', 'cell', 'office', 'work', 'other'],
				},
			},
		],
		organization: String,
		qualification: { type: String },
		slug: { type: String, lowercase: true, unique: true },
		Active: {
			type: Boolean,
			default: true,
		},
		Password_Activation: {
			type: String,
			default: '0',
		},
		type: {
			type: String,
			enum: [
				'admin',
				'partner',
				'mentor',
				'counselor',
				'university',
				'parents',
				'school',
				'student',
				'alumni',
			],
			default: 'student',
		},
		studentType: {
			type: String,
			enum: ['none', 'university', 'school'],
			default: function() {
				if (this.type === 'student') {
					return 'school';
				}
				return 'none';
			},
		},
		user_type: {
			type: Number,
		},
		status: {
			type: Number,
		},
		avatar: {
			type: String,
		},
		bannerImage: { type: String },
		AllbannerImage:[
			{
				image: {
					type: String,
				},
				active: {
					type: Boolean,
					default: false
				},
			},
		], 
		fb_id: { type: String, select: false },
		google_id: { type: String, select: false },
		user_roles: [Number],
		reset_password_token: {
			type: String,
		},
		attemptCalculation : {type: Number,default: 0},
		attemptBlock : {type: Boolean,default: false},
		passwordChange : {type: Boolean,default: false},
		forgetPasswordChange : {type: Boolean,default: false},
		reset_password_expires: {
			type: Date,
		},
		country: Number,
		state: Number,
		city: Number,
		source: String,
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
		notification:[
			{
				title:{type:
				String},
				
				isRead:{type:Boolean,
					default: false,}
			
		}],
			
		student_profile: {
			type: studentProfileSchema,
			select: true,
		},
		mentor_profile:{
			type:mentorProfileSchema,
			select:true
		},
		impact_partner: {
			type: new mongoose.Schema(
				{
					organization_name: {
						type: String,
					},
					contact_person_for_collegey: [
						{
							_id: false,
							name: { type: String },
							phone_number: [
								{
									_id: false,
									extension: {
										type: String,
									},
									number: {
										type: String,
									},
									tag: {
										type: String,
										enum: ['primary', 'cell', 'office', 'work', 'other'],
									},
								},
							],
						},
					],
					website: { type: String },
				},
				{ _id: false }
			),
			select: false,
		},
		impact_partner_profile: {
			type: new mongoose.Schema(
				{
					social_media_links: { type: mongoose.Schema.Types.Mixed },
					option_for_students: {
						type: String,
						enum: ['Volunteer', 'Intern'],
					},
					impact_area: { type: String },
					sdg: { type: String },
				},
				{ _id: false }
			),
			select: false,
		},
		school_partner: {
			type: new mongoose.Schema({
				school_name: { type: String },
				principal_name: String,
				counselor_name: String,
				curriculum: { type: String },
				other_text: String,
			}),
			select: false,
		},
		school_partner_profile: {
			type: new mongoose.Schema(
				{
					is_interested_in_dev_program: { type: Boolean },
					is_enrichment_center: { type: Boolean },
					student_with_impact_projects: { type: Number },
					countries_for_furthur_studies: [{ type: Number }],
				},
				{ _id: false }
			),
			select: false,
		},
		university_partner: {
			type: new mongoose.Schema({
				_id: false,
				university_name: { type: String },
				contact_person_for_collegey: [
					{
						name: { type: String },
						phone_number: [
							{
								extension: {
									type: String,
								},
								number: {
									type: String,
								},
								tag: {
									type: String,
									enum: ['primary', 'cell', 'office', 'work', 'other'],
								},
							},
							{ _id: false },
						],
					},
					{ _id: false },
				],
				address: {
					type: String,
				},
			}),
			select: false,
		},
		university_partner_profile: {
			type: new mongoose.Schema(
				{
					offer_courses: {
						grade: {
							type: String,
							enum: ['ug', 'pg'],
						},
						subjects: String,
						majors: String,
					},
					test_required: [
						{
							_id: false,
							type: String,
						},
					],
					scholarships_details: {
						type: String,
					},
				},
				{ _id: false }
			),
			select: false,
		},
	},
	MongoSchemaAddOn
);
userSchema.index({name:"text",last_name:"text"});
userSchema.plugin(urlSlug('name'));
userSchema.plugin(mongoosePaginate);


userSchema.virtual('countryObj', {
	ref: 'Country',
	localField: 'country',
	foreignField: 'id',
	justOne: true,
	select: 'name',
});
userSchema.virtual('stateObj', {
	ref: 'State',
	localField: 'state',
	foreignField: 'id',
	justOne: true,
	select: 'name',
});
userSchema.virtual('cityObj', {
	ref: 'City',
	localField: 'city',
	foreignField: 'id',
	justOne: true,
	select: 'name',
});
userSchema.virtual('preferred_countries_obj', {
	ref: 'Country',
	localField: 'student_profile.headed.preferred_countries',
	foreignField: 'id',
	justOne: false,
	select: 'name',
});

userSchema.virtual('profile_completion').get(function() {
	if (this.student_profile) {
		return getProfileCompletion(this.student_profile.toObject());
	}
});

userSchema.virtual('mentor_profile_completion').get(function() {
	if (this.mentor_profile) {
		return getMentorProfileCompletion(this.mentor_profile.toObject());
	}
});


userSchema.pre('findOneAndUpdate', async function() {
	const { student_profile } = this._update.$set;
	if (student_profile && student_profile.geography) {
		const geographyData = {
			country: student_profile.geography.country,
			state: student_profile.geography.state,
			city: student_profile.geography.city,
		};
		Object.keys(geographyData).forEach(
			key => geographyData[key] == null && delete geographyData[key]
		);
		this.update({}, { $set: geographyData });
	}
});

const User = mongoose.model('User', userSchema);
User.get = async function(query, limit, skip, sortBy, orderBy, selectDoc = '') {
	const totalCount = await User.countDocuments(query);
	const users = await User.find(query)
		.limit(limit)
		.skip(skip)
		.sort(sortBy)
		.select(selectDoc);
	return { users: users, total: totalCount };
};

module.exports = User;
