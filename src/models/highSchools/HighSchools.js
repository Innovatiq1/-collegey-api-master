const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const randomEnum = ['random 1', 'random 2', 'random 3', 'random 4'];
const country = ['country 1', 'country 2', 'country 3', 'country 4'];
const Board = ['Board 1', 'Board 2', 'Board 3'];
const city = ['city 1', 'city 2', 'city 3', 'city 4'];
const linkedIn = 'https://www.linkedin.com/company/collegey/';
const facebook = 'https://www.facebook.com/BeCollegey';
const instagram = 'https://www.instagram.com/becollegey/';
const youtube = 'https://www.youtube.com/channel/UC_vCErV7S2vK7TpjCG0Ig0Q';
const postImageUrl = [
	'https://images.pexels.com/photos/5428011/pexels-photo-5428011.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-5428011.jpg&fm=jpg',
	'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/5329056/pexels-photo-5329056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

const HighSchoolsSchema = new Schema(
	{
		// Instagram, facebook, youtube
		name: {
			type: String,
			required: true,
			default: function() {
				return randomEnum[Math.floor(Math.random() * randomEnum.length)];
			},
		},
		city: {
			type: String,
			default: function() {
				return city[Math.floor(Math.random() * city.length)];
			},
		},
		country: {
			type: String,
			default: function() {
				return country[Math.floor(Math.random() * country.length)];
			},
		},
		numberOfStudent: {
			type: 'number',
			default: function() {
				return Math.floor(Math.random() * 50) + 25;
			},
		},
		numberOfHighSchoolStudent: {
			type: 'number',
			default: function() {
				return Math.floor(Math.random() * 50) + 25;
			},
		},
		CurriculumOffered: [
			{
				type: String,
				required: true,
				default: function() {
					return Board[Math.floor(Math.random() * Board.length)];
				},
			},
		],
		linkedIn: {
			type: String,
			default: linkedIn,
		},
		instagram: {
			type: String,
			default: instagram,
		},
		facebook: {
			type: String,
			default: facebook,
		},
		youtube: {
			type: String,
			default: youtube,
		},
		schoolAmbassadors: [
			{
				type: ObjectId,
				ref: 'User', // Reference to some User
			},
		],
		contactPerson: [
			{
				type: ObjectId,
				ref: 'User', // Reference to some User
			},
		],
		team: [
			{
				type: ObjectId,
				ref: 'User', // Reference to some User
			},
		],
		logo: {
			type: String,
			default: function() {
				return postImageUrl[Math.floor(Math.random() * postImageUrl.length)];
			},
		},
	},
	{ timestamps: true }
);

const HighSchools = model('HighSchools', HighSchoolsSchema);
module.exports = HighSchools;
