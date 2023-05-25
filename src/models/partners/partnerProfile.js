const mongoose = require('mongoose');
const validator = require('validator');

const partnerProfileSchema = new mongoose.Schema(
	{
		// User Reference Object (refers to all user collection)
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Partner Profile must belong to a User!'],
		},
		isPartnerApproved: {
			type: Boolean,
			default: false,
		},
		// Access when Partner is approved
		// dashboardDocuments: {
		// 	type: [
		// 		{
		// 			user: {
		// 				type: mongoose.Schema.Types.ObjectId,
		// 				ref: 's3Bucket',
		// 			},
		// 		},
		// 	],
		// },
		partnerTestimonial: {
			type: {
				type: String,
				enum: ['url', 'text'],
			},
			url: {
				type: String,
			},
			text: {
				type: String,
			},
		},

		// Partner Profile (required for approval only)
		logo: { type: String, default: 'partner-logo.jpg' },
		banner: { type: String, default: 'partner-banner.jpg' },
		organizationName: { type: String, default: 'partner-banner.jpg' },
		country: { type: String },
		state: { type: String },
		city: { type: String },
		email: {
			type: String,
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email'],
		},
		personInOrganization: { type: String },
		OrganizationMobile: { type: Number },
		OrganizationWebsite: { type: String },
		OrganizationOfficeNumber: { type: Number },

		// Social Media Links of organization
		socialMediaLinks: [
			{
				category: {
					type: String,
					enum: [
						'youtube',
						'facebook',
						'whatsapp',
						'qq',
						'wechat',
						'tumblr',
						'instagram',
						'twitter',
						'skype',
						'viber',
						'line',
						'snapchat',
						'vkontakte',
						'pinterest',
						'linkedin',
						'telegram',
						'reddit',
						'others',
					],
				},
				url: {
					type: String,
				},
			},
		],

		opportunityForStudent: {
			volunteer: { type: Boolean },
			internship: { type: Boolean },
		},

		impactArea: { type: String },
		// sustainable development goal
		// API {{url}}/x-api/v1/public/getSdgList
		sdg: {
			type: String,
		},

		referAnotherPartner: [
			{
				referPersonwebsite: { type: String },
				referPersonName: { type: String },
				referPersonWorkEmail: { type: String },
				referPersonCellphone: { type: Number },
				referPersonLinkedInUrl: { type: String },
			},
		],

		isOrganizationRecruiting: { type: Boolean },
		ifOrganizationRecruitingIsTrue: [
			{
				jobTitle: { type: String },
				jobDescription: { type: String },
				jobType: { type: String, enum: ['full-time', 'part-time'] },
				jobLocation: { type: String },
				isJobRemote: { type: Boolean },
			},
		],
		ifOrganizationRecruitingIsFalse: {
			needHelpRecruiting: { type: Boolean },
		},
		//Captures date and time when Object is created and is used for sorting by date created
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//Populate middleware function
partnerProfileSchema.pre(/^find/, function(next) {
	this.populate('user');
	next();
});

const PartnerProfile = mongoose.model('PartnerProfile', partnerProfileSchema);

module.exports = PartnerProfile;
