/* eslint-disable node/no-unsupported-features/es-syntax */
import mongoose from 'mongoose';
import urlSlug from 'mongoose-url-slugs';

// import { statusTypesEnum } from '../utilities/constants';
// import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const randomText =
	'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles.';
const smRandom =
	'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.';
const projectTypeEnum = ['collegey', 'impact-partner', 'mentors'];
const projectStatus = ['completed', 'ongoing', 'pending', 'new'];

const mongoosePaginate = require('mongoose-paginate-v2');

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			// default: 'A Interesting Title not found',
		},
		description: { type: String, default: randomText },
		keyword:{
            type: [String],
            default:null
        },
		impact: { type: String, default: null },
		location: { type: String, default: null },
		partner: {
			type: mongoose.Schema.ObjectId,
			default: '6309a4657b1f9440b4337ca8',
			ref: 'User',
		},
		projectOwner: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		sdg: {
			type: [String],
		},
		hash_tags: {
			type: [String],
			default: null,
		},
		image: { type: String},
		// skills: {
		// 	type: [String],
		// 	default: null,
		// },
		documents: [{ type: String }],
		min_students_count: { type: Number, default: 0 },
		students_count: { type: Number, default: 0 },
		start_date: { type: Date},
		end_date: { type: Date},
		ask_questions: Boolean,
		projectfees: { type: String,default: 1 },
		questions: {
			type: [String],
			default: [
				'I am A random Questionnaire of  questions?',
				'I am a random question of questions?',
			],
		},
		can_be_done: {
			onsite: { type: String, default: 0 },
			othersite: { type: String, default: 0 },
			remotely: { type: String, default: 0 },
		},
		contact_person: {
			name: { type: String, default: null },
			phone_number: {
				extension: { type: String, default: null },
				number: { type: String, default: null },
			},
			email: { type: String, default: null },
			linkedin_url: {
				type: String,
				default: null,
			},
		},
		willing_to_consider: {
			answer: { type: String, default: null },
			comments: String,
		},
		projectStatus: {
			type: String,
			enum: ['completed', 'ongoing', 'pending', 'new', 'reject'],
			// default: function() {
			// 	return projectStatus[Math.floor(Math.random() * (projectStatus.length - 1))];
			// },
		},
		status:{type:Number,default: 0},
		slug: {
			type: String,
			lowercase: true,
			unique: true,
			index: true,
		},
		projectType: {
			type: String,
			enum: ['collegey', 'impact-partner', 'mentors', 'student'],
			// default: function() {
			// 	return projectTypeEnum[Math.floor(Math.random() * projectTypeEnum.length)];
			// },
		},

		active: { type: Boolean, default: false },
		mentor: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default:null
		},
		requestMentor: {
			type: mongoose.Schema.ObjectId,
			default:null
		},
		acceptMentorInvitation: {type: Boolean, default: null},
		projectPrice: {
			amount: {
				type: Number,
				default: 250,
			},
			currencySymbol: {
				type: String,
				default: '$',
			},
			currency: {
				type: String,
				default: 'US-DOLLAR',
			},
		},
		remainingSlot: { type: Number, default: 50 },
		projectPlan: {
			projectDuration: { type: String, enum: [4, 5, 6,'3 month','4 month','5 month','6 month','7 month','8 month','9 month'],
			default: 4
		},
			week1Duration: {   
				type: String,
				default: null,
			},
			week2Duration: {
				type: String,
				default: null,
			},
			week3Duration: {
				type: String,
				default: null,
			},
			week4Duration: {
				type: String,
				default: null,
			},
			week5Duration: {
				type: String,
				default: null,
			},
			week6Duration: {
				type: String,
				default: null,
			},

			monthDuration: {
				type: String,
				default: null,
			},
		},
		isPartnerProject: {
			type: Boolean,
		},
		ifPartnerProjectTrue: {
			partnerProjectDuration: {
				startDate: { type: Date },
				endDate: { type: Date },
			},
			acceptRevShare: {
				type: Boolean,
			},
			// between INR 12000 and INR 20000
			partnerProjectFees: {
				amount: {
					type: Number,
					default: 12000,
				},
				currencySymbol: {
					type: String,
					default: '₹',
				},
				currency: {
					type: String,
					default: 'INR',
				},
			},
			partnerProjectBankDetails: {
				bankName: String,
				bankAccount: Number,
				bankBranch: String,
				IFSCCode: String,
			},
			partnerProjectMentorAllow: { type: Boolean },
			partnerProjectMentor: {
				type: [mongoose.Schema.ObjectId],
				ref: 'User',
			},
			partnerLiveSessions: {
				weekly: [
					{
						day: String,
						time: String,
						duration: String,
						googleMeetLink: String,
					},
				],
			},
			partnerFeedbackForm: [],
		},
		projectMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		projectComments: [
			{
				user: {
					type: String,
				},
				comment: { type: String },
			},
		],
		projectCommentsDummy: {
			user: {
				type: String,
				default: 'Admin',
			},
			comment: { type: String, default: smRandom },
		},

		projectPost: [
			{
				postText: {type: String},
				postComment: {type: String},
				postData: {type: String},
				postImageUrl: {type: String},
				postType: {type: String},
				posturl: {type: String},
				postBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
				},
				postLike: [{ type: mongoose.Schema.Types.ObjectId}],
				createdAt: {type: Date}
			}
		],

		projectReview: [
			{
				reviewtext: {type: String},
				rating: {type: String},
				reviewByname: {type: String},
				reviewByimage: {type: String},
				reviewBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
				},
				createdAt: {type: Date}
			}
		],

		projectEvent: [
			{
				eventName: {type: String},
				timezone: {type: String},
				startDate: {type: Date},
				startTime: {type: String},
				endDate: {type: Date},
				endTime: {type: String},
				event_schedule: {type: String},
				eventGuest: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
				eventBy: { 
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
				},
				createdAt: {type: Date}
			}
		],

		projectPaymentUser: [
			{
				userBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
				},
				projectFess: {type: String},
				createdAt: {type: Date}
			}
		],
		
		projectpaymentId:{ type: String },
		projectpaymentStatus:{ type: String },

		// new student fields
		Milestones:{ type: String },
		studentMilestones: [{ milestone: String }],
		studentOutcome: { type: String },
	},
	MongoSchemaAddOn
);
projectSchema.plugin(urlSlug('title'));
projectSchema.plugin(mongoosePaginate);

projectSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'partner',
	});
	this.populate({
		path:'projectOwner'
	});
	this.populate({
		path:'mentor'
	});
	this.populate({
		path:'projectMembers'
	})
	next();
});
projectSchema.pre(/^findById/, function(next) {

	this.populate({
		path: 'partner',
	});
	this.populate({
		path:'projectOwner'
	});
	this.populate({
		path: 'projectPost.postBy'
	}); 
	this.populate({
		path:'mentor'
	});
	this.populate({
		path:'projectMembers'
	});
	this.populate({
		path: 'projectEvent.eventGuest',
	});
	next();
});
const Projects = mongoose.model('Projects', projectSchema);
module.exports = Projects;
