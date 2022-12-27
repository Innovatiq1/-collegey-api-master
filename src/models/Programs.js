import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypesEnum } from '../utilities/constants';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const programSchema = new mongoose.Schema(
	{
		title: String,
		short_description: String,
		description: String,
		including_tax: String,
		program_hour_text: String,
		category: String,
		deliverable: String,
		redirect_link: String,
		programepaymentId:String ,
		programepaymentStatus:String ,
        is_paid: Boolean,
		cost: Number,
		slug: { type: String, lowercase: true, unique: true, index: true },
		image: String,
		tags: [{ type: String }],
		status: {
			type: Number,
			enum: Object.values(statusTypesEnum.toJSON()),
			default: statusTypes.ACTIVE,
		},
		programPost: [
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
		programReview: [
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
		programEvent: [
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
		mentor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default:null
		},
		programMembers: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],



	},
	MongoSchemaAddOn
);
programSchema.plugin(urlSlug('title'));
programSchema.plugin(mongoosePaginate);
programSchema.pre(/^find/, function(next) {
	this.populate({
		path:'programEvent'
	});
	this.populate({
		path:'programPost'
	});
	this.populate({
		path:'programMembers'
	});
	this.populate({
		path:'mentor'
	})
	next();
});
programSchema.pre(/^findById/, function(next) {

	
	this.populate({
		path: 'programPost.postBy'
	}); 
	
	this.populate({
		path:'programMembers'
	});
	this.populate({
		path:'mentor'
	});
	this.populate({
		path: 'programEvent.eventGuest',
	});
	next();
});
programSchema.pre(/^findOne/, function(next) {

	
	this.populate({
		path: 'programPost.postBy'
	}); 
	
	this.populate({
		path:'programMembers'
	});
	this.populate({
		path:'mentor'
	});
	this.populate({
		path: 'programEvent.eventGuest',
	});
	next();
});


const Programs = mongoose.model('Programs', programSchema);
module.exports = Programs;
