// Importing Mongoose OBJECTID for validation
const { ObjectId } = require('mongoose').Types;

// Models
const Follow = require('../../models/follow');
const User = require('../../models/User');

// Default Functions
const factory = require('../factoryFunctions/handlerFactory');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

// using default factory functions (for admins)
exports.getAllFollows = factory.getAll(Follow);
exports.getAllFollowCounter = factory.getAllCounter(Follow);
exports.getFollow = factory.getOne(Follow);
exports.createFollow = factory.createOne(Follow);
exports.updateFollow = factory.updateOne(Follow);
exports.deleteFollow = factory.deleteOne(Follow);

// User Functions
exports.followAndUnfollow = catchAsync(async (req, res, next) => {
	if (req.params.followType === 'follow' || req.params.followType === 'unfollow') {
		// 0 Custom defining const to be used
		const { id } = req.params;
		const loggedInUserID = req.user._id.toString();

		// 1 Check if the id is a valid one
		if (!ObjectId.isValid(id)) {
			return next(new AppError('Invalid ID', 400));
		}

		// 2 Check if your id doesn't match the id of the user you want to follow
		if (loggedInUserID.toString() === req.params.id) {
			return next(new AppError('You cannot follow or unfollow yourself', 400));
		}

		// 3 check if the user id exists in Database
		const checkUserExist = await User.findById(id).countDocuments();
		if (checkUserExist === 0) {
			return next(new AppError('user does not exist', 404));
		}

		// 4 check if the user Follow/unfollow Database Exist
		const checkDocumentExist = await Follow.find({ user: loggedInUserID }).countDocuments();
		if (checkDocumentExist === 0) {
			await Follow.create({ user: loggedInUserID, followingList: [], followerList: [] });
		}

		const check2ndDocumentExist = await Follow.find({ user: id }).countDocuments();
		if (check2ndDocumentExist === 0) {
			await Follow.create({ user: id, followingList: [], followerList: [] });
		}

		// 5 when user wants to follow
		if (req.params.followType === 'follow') {
			// 1. check if the user is already followed
			const checkAlreadyFollowed = await Follow.findOne({
				user: loggedInUserID,
				followingList: {
					$elemMatch: {
						user: id,
					},
				},
			});
			if (checkAlreadyFollowed) {
				return next(new AppError('user already followed', 400));
			}

			// add the id of the user you want to follow in followingList array
			const query = {
				user: loggedInUserID,
			};

			const update = {
				$addToSet: { followingList: { user: id } },
			};

			// Query One execution
			const updated = await Follow.findOneAndUpdate(query, update, {
				new: true,
				runValidators: true,
			});

			// add user following in 2nd user
			const secondQuery = {
				user: id,
			};

			const secondUpdate = {
				$addToSet: { followerList: { user: loggedInUserID } },
			};

			// Query Two execution
			const secondUpdated = await Follow.findOneAndUpdate(secondQuery, secondUpdate, {
				new: true,
				runValidators: true,
			});

			if (!updated || !secondUpdated) {
				return next(new AppError('Somthing went wrong', 500));
			}

			// Send Response
			res.status(200).json({
				status: 'success',
				update,
				updated,
				secondUpdated,
			});
		} else if (req.params.followType === 'unfollow') {
			// 1. check if the user is already unfollowed
			const checkAlreadyunfollowed = await Follow.findOne({
				user: loggedInUserID,
				followingList: {
					$elemMatch: {
						user: id,
					},
				},
			});
			if (!checkAlreadyunfollowed) {
				return next(new AppError('user already unfollowed', 400));
			}

			// add the id of the user you want to follow in followingList array
			const query = {
				user: loggedInUserID,
			};

			const update = {
				$pull: { followingList: { user: id } },
			};

			// Query One execution
			const updated = await Follow.findOneAndUpdate(query, update, {
				new: true,
				runValidators: true,
			});

			// add user following in 2nd user
			const secondQuery = {
				user: id,
			};

			const secondUpdate = {
				$pull: { followerList: { user: loggedInUserID } },
			};

			// Query Two execution
			const secondUpdated = await Follow.findOneAndUpdate(secondQuery, secondUpdate, {
				new: true,
				runValidators: true,
			});

			if (!updated || !secondUpdated) {
				return next(new AppError('Somthing went wrong', 500));
			}

			// Send Response
			res.status(200).json({
				status: 'success',
				update,
				updated,
				secondUpdated,
			});
		}
	} else if (req.params.followType === 'get') {
		// GETs all user following or follower
		const doc = await Follow.findOne({ user: req.params.id });

		if (!doc) return next(new AppError('no document found with that ID', 404));

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	}
	// Send Error if the reqest does not match adding or removing followers
	else {
		return next(new AppError('Not a Valid request', 400));
	}
});
