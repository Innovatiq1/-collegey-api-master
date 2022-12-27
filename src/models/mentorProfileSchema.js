/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/es-syntax */
import mongoose from 'mongoose';
const randomEnum = ['random 1', 'random 2', 'random 3', 'random 4'];
const linkedIn = 'https://www.linkedin.com/company/collegey/';

const randomText =
	'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles.';
const smRandom =
	'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.';
const projectTypeEnum = ['collegey', 'impact-partner', 'mentors'];
const projectStatus = ['completed', 'ongoing', 'pending', 'new'];

const mentorProfileSchema = new mongoose.Schema({
	profile: {
        professionalTitle:{
            type:String,
            default: null
        },
        location: {
            type: String,
            default: null
        },
        country: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        },
        timezone: {
            type: String,
            default: null
        },
        fullLegalName: { type: String,default: null },
        aboutYou: {
            type: String,
            maxLength: 210,
            default: null
        },
        adviceToYoungPeople: {
            type: String,
            maxLength: 50,
            default: null
        },
        favBooks: [
            {
                type: String,
            },
        ],
        interest: [{ type: String }],
        other_interest: { type: String },
        expertise: [{ type: String }],
        other_expertise: { type: String },
        can_help: [{type: String,default: null}],
        industry: { type: String,default: null },
        other_industry: { type: String },
        lastCollegeDegree: { type: String,default: null },
        linkedIn: {
            type: String,
            default: linkedIn,
        },
        shouldAgree: {type:Boolean,default:false},
        experience: { type: Number,default: null },
        lastEducationalInstitutionAttended: { type: String,default: null },
        website: { type: String,default: null },
        videoIntroduction:{
            type:String,
            default: null
        },
        rating:{
            type:Number,
            default:0
        },
        is_completed: {type:Boolean,default:false},
	},
    officeHours : [
        {
            days:{type:String,default:null},
            start_time:{type:String,default:null},
            end_time:{type:String,default:null},
            closed : {type:String,default:null},
        },
    ],
    officeTimezone: {
        timezoneName: {
            type: String,
            default: null
        },
        is_completed: {type:Boolean,default:false},
    },
	// officeHours: {
	// 	time:{
    //         type:Date,
    //         default:null
    //     },
    //     is_completed: {type:Boolean,default:false},
	// },
	projects: {
        projectTitle: {
            type:String,
            default:null
        },
        bannerImage:{
            type:String,
            default:null
        },
        lastDate:{
            type:Date,
            default:null
        },
        startDate:{
            type: Date,
            default:null
        },
        keyword:{
            type:String,
            default:null
        },
        maxNumberOfStudentsAllowed:{
            type:String,
            default:null
        },
        minNumberOfStudentsAllowed:{
            type:String,
            default:null
        },
        projectUNSDG:{
            type:String,
            default:null
        },
        aboutProject:{
            type:String,
            default:null
        },
        projectPlan:{
            projectDuration: { type: Number, default: 4, enum: [4, 5, 6] },
			week1Duration: {
				type: String,
				default: smRandom,
			},
			week2Duration: {
				type: String,
				default: smRandom,
			},
			week3Duration: {
				type: String,
				default: smRandom,
			},
			week4Duration: {
				type: String,
				default: smRandom,
			},
			week5Duration: {
				type: String,
				default: smRandom,
			},
			week6Duration: {
				type: String,
				default: smRandom,
			},
        },
        isPaid:{
            type:Boolean,
            default:null
        },
        price:{
            type:Number,
            default:0
        },
        is_completed: {type:Boolean,default:false},
	}
});
mentorProfileSchema.set('toObject', { getters: true, setters: true }, 'toJSON', {
	getters: true,
	setters: true,
});
module.exports = mentorProfileSchema;
