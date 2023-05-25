// Importing Mongoose OBJECTID for validation
const { ObjectId } = require('mongoose').Types;

// Models
const Watchlist = require('../../models/watchlistForStudentProject');
const Project = require('../../models/Projects');

// Default Functions
const factory = require('../factoryFunctions/handlerFactory');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

// using default factory functions (for admins)
exports.getAllWatchlists = factory.getAll(Watchlist);
exports.getAllWatchlistCounter = factory.getAllCounter(Watchlist);
exports.getWatchlist = factory.getOne(Watchlist);
exports.createWatchlist = factory.createOne(Watchlist);
exports.updateWatchlist = factory.updateOne(Watchlist);
exports.deleteWatchlist = factory.deleteOne(Watchlist);

// User Functions
exports.watchlistAddOrRemove = catchAsync(async (req, res, next) => {
	if (req.params.watchlist === 'add' || req.params.watchlist === 'remove') {
		// 0 Custom defining const to be used
		const { id } = req.params; // Id of project to watch
		const loggedInUserID = req.user._id.toString();

		// 1 Check if the id is a valid one
		if (!ObjectId.isValid(id)) {
			return next(new AppError('Invalid ID', 400));
		}

		// 2 Check if your id doesn't match the id of the project you want to watch
		if (loggedInUserID.toString() === req.params.id) {
			return next(new AppError('This is amazing, user is not a project', 400));
		}

		// 3 check if the project id exists in Database
		const checkProjectExist = await Project.findById(id).countDocuments();
		if (checkProjectExist === 0) {
			return next(new AppError('Project does not exist', 404));
		}

		// 4 check if the user watchlist Database Exist
		const checkDocumentExist = await Watchlist.find({ user: loggedInUserID }).countDocuments();
		if (checkDocumentExist === 0) {
			// if it doesn't exist, then create a watchlist'
			await Watchlist.create({ user: loggedInUserID, watchlist: [] });
		}

		// 5 when user wants to add
		if (req.params.watchlist === 'add') {
			// 1. check if the project is already in the watchlist
			const checkinWatchlist = await Watchlist.findOne({
				user: loggedInUserID,
				watchlist: {
					$elemMatch: {
						project: id,
					},
				},
			});
			if (checkinWatchlist) {
				return next(new AppError('Project already watching', 400));
			}

			// add the id of the project you want to watch
			const query = {
				user: loggedInUserID,
			};

			const update = {
				$addToSet: { watchlist: { project: id } },
			};

			// Query One execution
			const updated = await Watchlist.findOneAndUpdate(query, update, {
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
		} else if (req.params.watchlist === 'remove') {
			// 1. check if the project is already watching
			const checkAlreadyWatching = await Watchlist.findOne({
				user: loggedInUserID,
				watchlist: {
					$elemMatch: {
						project: id,
					},
				},
			});
			if (!checkAlreadyWatching) {
				return next(new AppError('already not watching project', 400));
			}

			// add the id of the project you want to un-watch
			const query = {
				user: loggedInUserID,
			};

			const update = {
				$pull: { watchlist: { project: id } },
			};

			// Query One execution
			const updated = await Watchlist.findOneAndUpdate(query, update, {
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
	} else if (req.params.watchlist === 'get') {
		let { id } = req.params;
		// checking for your my filter for id
		id = id === 'my' ? req.user._id : id;

		// populate filter
		let doc;
		if (id === 'mywithpopulate') {
			// GETs all Project user is watching
			doc = await Watchlist.findOne({ user: req.user._id }).populate({
				path: 'watchlist.project',
			});
		} else {
			// GETs all Project user is watching
			doc = await Watchlist.findOne({ user: id });
		}

		if (!doc) return next(new AppError('no document found with that ID', 404));

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	}
	// Send Error if the reqest does not match above parameters
	else {
		return next(new AppError('Not a Valid request', 400));
	}
});
