const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const APIFeatures = require('../../utils/apiFeatures');
const APIFeaturesCounter = require('../../utils/apiFeaturesCounter');
const { ObjectId } = require('bson');

// get loggedInUserID to a variable
exports.getMe = variable => (req, res, next) => {
	req.body[variable] = req.user._id;
	// console.log(`🚀 ~ file: handlerFactory.js ~ line 9 ~ req.body`, req.body);
	next();
};

// delete upadate and create to do the specified fucntions
exports.deleteOne = Model =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);

		if (!doc) return next(new AppError('Nothing to delete', 404));

		res.status(204).json({
			status: 'success',
			message: `${doc} has been deleted successfully`,
			data: null,
		});
	});

exports.updateOne = Model =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		//console.log(`=============doc================${doc}`)

		if (!doc) return next(new AppError('No Document found with id', 404));

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

exports.createOne = Model =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);
		res.status(201).json({
			status: 'success',

			data: {
				data: doc,
			},
		});
	});

// single function to populate query
exports.getOne = (Model, popOptions) =>
	catchAsync(async (req, res, next) => {
		let doc;
		if (popOptions) doc = await Model.findById(req.params.id).populate(popOptions);
		if (!popOptions) doc = await Model.findById(req.params.id);

		if (!doc) return next(new AppError('no document found with that ID', 404));

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

exports.getAll = Model =>
	catchAsync(async (req, res, next) => {
		const filter = {};
		//console.log("req.query",req.query);
		if (typeof req.query.projectOwner !== 'undefined') {
			delete req.query.skip;
			if (req.query && req.query.sortBy) {
				req.query.sort = req.query.sortBy;
			}
			delete req.query.sortBy;
			let obj = req.query;
			obj['projectStatus'] = 'pending';
			const features = new APIFeatures(Model.find(filter), obj)
				.filter()
				.sort()
				.limitFields()
				.paginate();
			const data = await features.query;
			// SEND RESPONSE
			res.status(200).json({
				status: 'success',
				results: data.length,
				data: {
					data: data,
				},
			});
		}
		else {
			delete req.query.skip;
			if (req.query && req.query.sortBy) {
				req.query.sort = req.query.sortBy;
			}
			delete req.query.sortBy;
			let obj = req.query;
			const features = new APIFeatures(Model.find(filter), req.query)
				.filter()
				.sort()
				.limitFields()
				.paginate();
			const data = await features.query

			const totalRecordCount = new APIFeatures(Model.find(filter), req.query).filter()
			const totalRecords = await totalRecordCount.query.count();

			// SEND RESPONSE
			res.status(200).json({
				status: 'success',
				results: data.length,
				totalRecords: totalRecords,
				data: {
					data: data,
				},
			});
		}
	});
exports.getAllCounter = Model =>
	catchAsync(async (req, res, next) => {
		const filter = {};

		// Place for custom filters to be used (will use to filter active and inactive riders)
		// let filter = {};
		// if (req.params.filterdata && req.params.filter) {
		// 	const filterData = req.params.filterdata
		// 	const filterValue = req.params.filter

		// 	filter = { filterValue : filterData };
		// }
		delete req.query.skip;
		if (req.query && req.query.sortBy) {
			req.query.sort = req.query.sortBy;
		}
		delete req.query.sortBy;
		const features = new APIFeaturesCounter(Model.find(filter), req.query).filter();
		const data = await features.query;

		// SEND RESPONSE
		res.status(200).json({
			status: 'success',
			results: data.length,
			data: {
				data: data,
			},
		});
	});
exports.getpostEvent = Model =>
	catchAsync(async (req, res, next) => {
		let cid = ObjectId(req.body.id);
		const checkinWatchlist = await Model.findOne({
			_id: cid,
			attendingEvents: {
				$elemMatch: {
					user: req.body.userid,
				},
			},
		});
		if (checkinWatchlist) {
			res.status(200).json({
				status: 'success',
				results: "user Id AllreadyExist"

			});
			//return next(new AppError('Project already watching', 400));
		} else {
			const query = {
				_id: cid,
			};
			const updated1 = await Model.find(query)



			const update = {
				count: updated1[0].count + 1,
				$addToSet: { attendingEvents: { user: req.body.userid } },
			};

			// Query One execution
			const updated = await Model.findOneAndUpdate(query, update, {
				new: true,
				runValidators: true,
			});

			if (!updated) {
				return next(new AppError('Something went wrong', 500));
			}

			// Send Response
			res.status(200).json({
				status: 'success',
				updated,
			});

		}

		const filter = {};

		// Place for custom filters to be used (will use to filter active and inactive riders)
		// let filter = {};
		// if (req.params.filterdata && req.params.filter) {
		// 	const filterData = req.params.filterdata
		// 	const filterValue = req.params.filter

		// 	filter = { filterValue : filterData };
		// }
		// delete req.query.skip;
		// if (req.query && req.query.sortBy) {
		// 	req.query.sort = req.query.sortBy;
		// }
		// delete req.query.sortBy;
		// const features = new APIFeaturesCounter(Model.find(filter), req.query).filter();
		// const data = await features.query;

		// // SEND RESPONSE
		// res.status(200).json({
		// 	status: 'success',
		// 	results: data.length,
		// 	data: {
		// 		data: data,
		// 	},
		// });
	});

exports.getpostMenorFollow = Model =>
	catchAsync(async (req, res, next) => {
		let cid = ObjectId(req.body.id);
		const checkinWatchlist = await Model.findOne({
			_id: cid,
			mentorFollow: {
				$elemMatch: {
					user: req.body.userid,
				},
			},
		});
		if (checkinWatchlist) {
			res.status(200).json({
				status: 'success',
				results: "user Id AllreadyExist"

			});
			//return next(new AppError('Project already watching', 400));
		} else {
			const query = {
				_id: cid,
			};
			const updated1 = await Model.find(query)



			const update = {
				Followcount: updated1[0].Followcount + 1,
				$addToSet: { mentorFollow: { user: req.body.userid } },
			};

			// Query One execution
			const updated = await Model.findOneAndUpdate(query, update, {
				new: true,
				runValidators: true,
			});

			if (!updated) {
				return next(new AppError('Something went wrong', 500));
			}

			// Send Response
			res.status(200).json({
				status: 'success',
				updated,
			});

		}

		const filter = {};


	});

exports.getAllWithFilter = Model =>
	catchAsync(async (req, res, next) => {
		delete req.query.skip;
		if (req.query && req.query.sortBy) {
			req.query.sort = req.query.sortBy;
		}
		delete req.query.sortBy;
		const features = new APIFeatures(Model.find(req.body.filter), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const data = await features.query;

		// SEND RESPONSE
		res.status(200).json({
			status: 'success',
			results: data.length,
			data: {
				data: data,
			},
		});
	});

// Mark Done Model => subDoc[name of array] ```Done : true``` using user id
// middleware => called after protect(user data is put into user.req) middleware
exports.markDoneSubDoc = (Model, subDoc) =>
	catchAsync(async (req, res, next) => {
		// Checking for user id, subDoc
		// console.log('🚀 ~ file: handlerFactory.js ~ line 99 ~ user.id, subDoc, params.id =>', req.user.id, subDoc, req.params.id);

		const doc = await Model.findOneAndUpdate({ user: req.user.id });

		doc[subDoc].forEach(el => {
			// eslint-disable-next-line eqeqeq
			if (el._id == req.params.id) el.done = true;
		});
		doc.save();

		// to see if doc.array.done value is changed to ture or not
		// console.log(doc);
		if (!doc) {
			next(
				new AppError(
					'Unable to find your tasks, please try again with create a new task',
					500
				)
			);
		} else {
			res.status(200).json({
				status: 'success',
				data: {
					data: doc,
				},
			});
		}
	});

// addMyTask
exports.pushNewSubDoc = Model =>
	catchAsync(async (req, res, next) => {
		// Auth Controller protect puts user deatils in req.user
		// req.body has the relivant data to push in the sub doc.
		const doc = await Model.findOneAndUpdate(
			{ user: req.user.id },
			{ $push: req.body },
			{ new: true }
		);

		if (!doc) {
			next(
				new AppError(
					'Unable to find your tasks, please try again with create a new task',
					500
				)
			);
		} else {
			res.status(200).json({
				status: 'success',
				data: {
					data: doc,
				},
			});
		}
	});

// Create a collection for a user
// Create a task, notification
exports.createDocWithUserId = Model =>
	catchAsync(async (req, res, next) => {
		// Auth Controller (protect) puts user deatils in req.user
		req.body.user = req.user;
		const doc = await Model.create(req.body);
		res.status(201).json({
			status: 'success',

			data: {
				data: doc,
			},
		});
	});

exports.getAllWithUserId = Model =>
	catchAsync(async (req, res, next) => {
		delete req.query.skip;
		if (req.query && req.query.sortBy) {
			req.query.sort = req.query.sortBy;
		}
		delete req.query.sortBy;
		// Auth Controller puts user deatils in req.user
		const doc = await Model.find({ user: req.user.id });

		// console log to see what is comming from mongoDB
		// console.log('🎉🎉🎉🎉🎉', doc);

		if (!doc) {
			res.status(404).json({
				status: 'success',
				task: 'You have 0 Task',
				data: {
					data: doc,
				},
			});
		} else {
			res.status(200).json({
				status: 'success',
				data: {
					data: doc,
				},
			});
		}
	});


exports.getAllActiveList = Model =>
	catchAsync(async (req, res, next) => {
		const filter = {
			"active": true
		};
		if (typeof req.query.projectOwner !== 'undefined') {
			delete req.query.skip;
			if (req.query && req.query.sortBy) {
				req.query.sort = req.query.sortBy;
			}
			delete req.query.sortBy;
			let obj = req.query;
			obj['projectStatus'] = 'pending';
			const features = new APIFeatures(Model.find(filter), obj)
				.filter()
				.sort()
				.limitFields()
				.paginate();
			const data = await features.query;
			// SEND RESPONSE
			res.status(200).json({
				status: 'success',
				results: data.length,
				data: {
					data: data,
				},
			});
		}
		else {
			delete req.query.skip;
			if (req.query && req.query.sortBy) {
				req.query.sort = req.query.sortBy;
			}
			delete req.query.sortBy;

			const features = new APIFeatures(Model.find(filter), req.query)
				.filter()
				.sort()
				.limitFields()
				.paginate();
			const data = await features.query;
			// SEND RESPONSE
			res.status(200).json({
				status: 'success',
				results: data.length,
				data: {
					data: data,
				},
			});
		}


	});

exports.getAllisDeletedList = Model =>
	catchAsync(async (req, res, next) => {
		const filter = {
			"isDeleted": true
		};
		if (typeof req.query.projectOwner !== 'undefined') {
			delete req.query.skip;
			if (req.query && req.query.sortBy) {
				req.query.sort = req.query.sortBy;
			}
			delete req.query.sortBy;
			let obj = req.query;
			const features = new APIFeatures(Model.find(filter), obj)
				.filter()
				.sort()
				.limitFields()
				.paginate();
			const data = await features.query;
			// SEND RESPONSE
			res.status(200).json({
				status: 'success',
				results: data.length,
				data: {
					data: data,
				},
			});
		}
		else {
			delete req.query.skip;
			if (req.query && req.query.sortBy) {
				req.query.sort = req.query.sortBy;
			}
			delete req.query.sortBy;

			const features = new APIFeatures(Model.find(filter), req.query)
				.filter()
				.sort()
				.limitFields()
				.paginate();
			const data = await features.query;
			// SEND RESPONSE
			res.status(200).json({
				status: 'success',
				results: data.length,
				data: {
					data: data,
				},
			});
		}


	});	