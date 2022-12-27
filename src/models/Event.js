const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const randomEnum = ['event 1', 'event 2', 'event 3', 'event 4'];
const eventImageUrl = [
	'https://images.pexels.com/photos/5428011/pexels-photo-5428011.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-5428011.jpg&fm=jpg',
	'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/5329056/pexels-photo-5329056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

const urlString = [
	'https://www.youtube.com/watch?v=iTs-EGTJy6o',
	'https://www.youtube.com/watch?v=ecoumWfNzdk',
	'https://www.youtube.com/watch?v=NUYvbT6vTPs&ab_channel=BilalG%C3%B6regen',
	'https://www.youtube.com/watch?v=gH919am-83M&ab_channel=BongoCat',
	'https://www.youtube.com/watch?v=5XujNgsOaSg&ab_channel=BongoCat',
];

const eventVisibilityText = 'Public Event';

const eventText =
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio atque quaerat, architecto iste commodi, nemo dignissimos, laborum explicabo ab sequi repudiandae! Eveniet impedit, minima provident explicabo beatae et deleniti non.';

const EventSchema = new Schema({
	organizer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	attendingEvents:{
	type: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		},
	],
},
	
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Projects',
	},
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group',
	},
	logo: {
		type: String,
		default: function() {
			return eventImageUrl[Math.floor(Math.random() * eventImageUrl.length)];
		},
	},
	banner: {
		type: String,
		default: function() {
			return eventImageUrl[Math.floor(Math.random() * eventImageUrl.length)];
		},
	},
	eventName: {
		type: String,
		default: function() {
			return randomEnum[Math.floor(Math.random() * randomEnum.length)];
		},
	},
	timezone: { type: String },
	count: {
		type: Number,
		default: 0,
	},
	event_status:  { type: String },
	feeStatus:  { type: String },
	online_link:  { type: String },
	avenue_address:  { type: String },
	startDate: {
		type: Date,
		default: function() {
			return new Date();
		},
	},
	startTime: { type: String },
	endDate: {
		type: Date,
		default: function() {
			return new Date();
		},
	},
	createdAt: {type: Date,required: true,default: Date.now,},
	endTime: { type: String },
	description: {
		type: String,
		default: eventText,
	},
	eventFrequency: {
		type: String,
	},
	eventVisibility: {
		type: String,
		default: eventVisibilityText,
	},
	onlineEvent: {
		type: Boolean,
		default: false,
	},
	registrationOrBroadcastLink: {
		type: String,
		default: function() {
			if (this.postType === 'video') {
				return urlString[Math.floor(Math.random() * urlString.length)];
			}
			return '';
		},
	},
});

const Event = model('Event', EventSchema);
module.exports = Event;
