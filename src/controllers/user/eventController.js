const Event = require('../../models/Event');
const MentorFollow = require('../../models/User');
const University = require('../../models/highSchools/universityModel');
const { ObjectId } = require('bson');

const factory = require('../factoryFunctions/handlerFactory');

// using default factory functions

exports.postUser = factory.getAll(MentorFollow);

// exports.getAllEvents = factory.getAll(Event);

exports.getAllEvents = async (req, res, next) => {
	let docLimit = req.body.docLimit;
	let skip = req.body.skipFeed;

	let Allaggregate = [
		{ $sort: { startDate: -1 } },
		{
			$lookup: {
				from: 'users',
				localField: 'organizer',
				foreignField: '_id',
				as: 'eventOrganizer'
			}
		},
		{ $unwind: {   path: "$eventOrganizer",  preserveNullAndEmptyArrays: false }  },
		{
			$facet: {
				data: [{ $skip: skip }, { $limit: docLimit }],
				pageInfo: [
					{
						$group: { _id: null, count: { $sum: 1 } },
					},
				],
			},
		},
		{
			$unwind: { path: '$pageInfo', preserveNullAndEmptyArrays: true },
		},
		{
			$project: {
				item: '$data',
				pageInfo: {
					count: '$pageInfo.count',
				},
			},
		},
	];

	var allEvents = await Event.aggregate(Allaggregate);

	try {
		if (allEvents) {
			res.status(200).json({
				status: 'success',
				results: allEvents[0].pageInfo.count,
				data: { data: allEvents[0].item },
			});
		}
	} catch (error) {
		next(error);
	}
};

exports.getEventsByMonth = async (req, res, next) => {
	let docLimit = req.body.docLimit;
	let skip = req.body.skipFeed;
	let startingMonth = parseInt(req.body.startingMonth);
	let startingYear = parseInt(req.body.startingYear);
	let eventsByMonth = [];
	let startDate = new Date(startingYear, startingMonth - 1, 1, 5, 30, 0);
	let endDate;

	if (startingMonth == 12) {
		endDate = new Date(startingYear + 1, 0, 1, 5, 30, 0);
	} else {
		endDate = new Date(startingYear, startingMonth, 1, 5, 30, 0);
	}

	let Allaggregate = [
		{ $sort: { startDate: -1 } },
		{
			$match: {
				startDate: {
					$gte: startDate,
					$lt: endDate,
				},
			},
		},
		{
			$facet: {
				data: [{ $skip: skip }, { $limit: docLimit }],
				pageInfo: [
					{
						$group: { _id: null, count: { $sum: 1 } },
					},
				],
			},
		},
		{
			$unwind: { path: '$pageInfo', preserveNullAndEmptyArrays: true },
		},
		{
			$project: {
				item: '$data',
				pageInfo: {
					count: '$pageInfo.count',
				},
			},
		},
	];

	var allEvents = await Event.aggregate(Allaggregate);

	try {
		if (allEvents) {
			res.status(200).json({
				status: 'success',
				results: allEvents[0].pageInfo.count,
				data: { data: allEvents[0].item },
			});
		}
	} catch (error) {
		next(error);
	}
};

exports.getEventsByUser = async (req, res, next) => {
	let docLimit = req.body.docLimit;
	let skip = req.body.skipFeed;

	let Allaggregate = [
		{ $sort: { startDate: -1 } },
		{
			$match: {
				'attendingEvents.user': ObjectId(req.body.userId),
			},
		},
		{
			$facet: {
				data: [{ $skip: skip }, { $limit: docLimit }],
				pageInfo: [
					{
						$group: { _id: null, count: { $sum: 1 } },
					},
				],
			},
		},
		{
			$unwind: { path: '$pageInfo', preserveNullAndEmptyArrays: true },
		},
		{
			$project: {
				item: '$data',
				pageInfo: {
					count: '$pageInfo.count',
				},
			},
		},
	];

	var allEventsByUser = await Event.aggregate(Allaggregate);

	try {
		if (allEventsByUser) {
			res.status(200).json({
				status: 'success',
				results: allEventsByUser[0].pageInfo.count,
				data: { data: allEventsByUser[0].item },
			});
		}
	} catch (error) {
		next(error);
	}
};

exports.studentUpdateEvents = async (req, res, next) => {
	let postData = req.body;
	let where = {
		_id: ObjectId(postData.event_id),
	};

	delete postData.event_id;

	var updateEventData = await Event.findByIdAndUpdate(where, postData);

	try {
		if (updateEventData) {
			res.status(200).json({
				status: 'success',
				data: {
					data: updateEventData,
				},
			});
		}
	} catch (error) {
		next(error);
	}
};

exports.getAllEventCounter = factory.getAllCounter(Event);
exports.postattendEvent = factory.getpostEvent(Event);
exports.postMentorFollow = factory.getpostMenorFollow(MentorFollow);
exports.postUniverCiyFollow = factory.getpostMenorFollow(University);
exports.getEvent = factory.getOne(Event);
exports.createEvent = factory.createOne(Event);
exports.updateEvent = factory.updateOne(Event);
exports.deleteEvent = factory.deleteOne(Event);

exports.postUnFollower = async (req, res) => {
	let postData = req.body;
	const userData = await MentorFollow.findOne({ _id: postData.id });
	var searchUser = postData.userid;
	let index = -1;

	for (let i = 0; i < userData.mentorFollow.length; i++) {
		if (userData.mentorFollow[i].user == searchUser) {
			index = i;
			break;
		}
	}

	if (index !== -1) {
		userData.mentorFollow.splice(index, 1);
	}
	let result = await MentorFollow.findOneAndUpdate({ _id: postData.id }, userData);

	res.status(200).json({
		status: 'Success',
		message: 'Unfollow Successfully',
	});
};
