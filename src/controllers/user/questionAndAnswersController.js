// Importing Mongoose OBJECTID for validation
const { ObjectId } = require('mongoose').Types;

// Models
const QuestionsAndAnswers = require('../../models/questionAndAnswers');
// const User = require('../../models/User');

// Default Functions
const factory = require('../factoryFunctions/handlerFactory');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const likeDislike = require('../../models/likeDislike')
const answerModel = require('../../models/answerToQuestion')
const APIFeatures = require('../../utils/apiFeatures');
const APIFeaturesCounter = require('../../utils/apiFeaturesCounter');

// using default factory functions (for admins)
//exports.getAllQuestionsAndAnswers = factory.getAll(QuestionsAndAnswers);
exports.getAllQuestionsAndAnswersCounter = factory.getAllCounter(QuestionsAndAnswers);
exports.getQuestionsAndAnswers = factory.getOne(QuestionsAndAnswers);
exports.createQuestionsAndAnswers = factory.createOne(QuestionsAndAnswers);
exports.updateQuestionsAndAnswers = factory.updateOne(QuestionsAndAnswers);
exports.deleteQuestionsAndAnswers = factory.deleteOne(QuestionsAndAnswers);

exports.getQuestionsAndAnswers1 = async (req, res, next) => {
	try {
		const id = req.params.id;
		const singleQuestion = await QuestionsAndAnswers.findById(id)

		res.status(200).json({
			status: "success",
			message: "Question and answer retrieved successfully",
			data: singleQuestion
		});
	} catch (error) {
		next(error)
	}
}

exports.getAllQuestionsAndAnswers = async (req, res, next) => {
	let postData = req.body;

	let where = {
		$and: [
			{
				active: true,
			},
			{
				user: {
					$ne: ObjectId(postData.user_id)
				}
			}
		]

	}
	let whereUser = {
		$and: [
			{
				active: true,
				
			},
			{
				user: ObjectId(postData.user_id)
			}
		]

	}

	let allUserQNA = [
		{
			$match: whereUser
		},
		{ $sort: { createdAt: -1 } },
		{
			$lookup: {
				from: 'users',
				localField: 'user',
				foreignField: '_id',
				as: 'userdata'
			}
		},
		{ $unwind: { path: "$userdata", preserveNullAndEmptyArrays: false } },
		{
			$lookup: {
				from: "answers",
				let: {
					answerid: "$answers",
				},
				pipeline: [
					{
						$match: {
							$expr: { $in: ["$_id", "$$answerid"] },
						},
					},
					{
						$lookup: {
							from: 'users',
							localField: 'user',
							foreignField: '_id',
							as: 'user'
						},
					},
					{ $unwind: '$user' },
				],
				as: "answersdata",
			},
		},
		{
			$project: {
				_id: 1,
				question: 1,
				answers: "$answersdata",
				questionTag: 1,
				createdAt: 1,
				active: 1,
				user: "$userdata",
				shares: 1,
			}
		},
	];

	let Allaggregate = [
		{
			$match: where
		},
		{ $sort: { createdAt: -1 } },
		{
			$lookup: {
				from: 'users',
				localField: 'user',
				foreignField: '_id',
				as: 'userdata'
			}
		},
		{ $unwind: { path: "$userdata", preserveNullAndEmptyArrays: false } },
		{
			$lookup: {
				from: "answers",
				let: {
					answerid: "$answers",
				},
				pipeline: [
					{
						$match: {
							$expr: { $in: ["$_id", "$$answerid"] },
						},
					},
					{
						$lookup: {
							from: 'users',
							localField: 'user',
							foreignField: '_id',
							as: 'user'
						},
					},
					{ $unwind: '$user' },
				],
				as: "answersdata",
			},
		},
		{
			$project: {
				_id: 1,
				question: 1,
				answers: "$answersdata",
				questionTag: 1,
				createdAt: 1,
				active: 1,
				user: "$userdata",
				shares: 1,
			}
		},
	];

	var all_user_questions = await QuestionsAndAnswers.aggregate(
		allUserQNA
	);

	var all_quetion_data = await QuestionsAndAnswers.aggregate(
		Allaggregate
	);

	var all_quetion = all_user_questions.concat(all_quetion_data)
	let totalrecord = await QuestionsAndAnswers.find().count();
	res.status(200).json({
		status: "success",
		message: "Questions and answer retrieved successfully",
		data: { data: all_quetion },
		results: totalrecord,
	});
}

// User Functions
exports.askQuestion = catchAsync(async (req, res, next) => {
	// Getting user id of logged In User
	req.body.user = req.user._id.toString();

	const doc = await QuestionsAndAnswers.create(req.body);
	res.status(201).json({
		status: 'success',

		data: {
			data: doc,
		},
	});
});

exports.answerAQuestion = catchAsync(async (req, res, next) => {
	// 0 check request data and answer data
	if (!(req.body && req.body.answerData)) {
		return next(new AppError('Invalid request', 400));
	}

	// 1 Getting user id of logged In User
	const loggedInUserID = req.user._id.toString();
	const questionId = req.params.questionId.toString();

	// 1 Check if the id is a valid one
	if (!ObjectId.isValid(questionId)) {
		return next(new AppError('Invalid ID', 400));
	}

	// 2 Check if your question doc exist
	const checkQuestionExist = await QuestionsAndAnswers.findById(questionId).countDocuments();
	if (checkQuestionExist === 0) {
		return next(new AppError('Question does not exist', 404));
	}

	// 3 check if user has answered before
	const checkAlreadyAnswered = await QuestionsAndAnswers.findOne({
		_id: questionId,
		answers: {
			$elemMatch: {
				user: loggedInUserID,
			},
		},
	});

	// 4 if user has answered before then update old answer
	if (checkAlreadyAnswered) {
		// update the answer
		const doc = await QuestionsAndAnswers.findOneAndUpdate(
			{
				_id: questionId,
				answers: {
					$elemMatch: {
						user: loggedInUserID,
					},
				},
			},
			{
				$set: {
					'answers.$.answerData': req.body.answerData,
					'answers.$.updatedAt': Date.now(),
				},
			},
			{
				new: true,
				runValidators: true,
			}
		);

		if (!doc)
			return next(
				new AppError(
					'Something Went Worong in API LOGIC in question and answer fourm pls contact support or developers',
					404
				)
			);

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	} else {
		// add a new answer
		const query = {
			_id: questionId,
		};

		const update = {
			$addToSet: {
				answers: {
					user: loggedInUserID,
					answerData: req.body.answerData,
				},
			},
		};

		// Query One execution
		const updated = await QuestionsAndAnswers.findOneAndUpdate(query, update, {
			new: true,
			runValidators: true,
		});

		if (!updated) {
			return next(new AppError('Somthing went wrong', 500));
		}

		// Send Response
		res.status(200).json({
			status: 'success',
			updated,
		});
	}
});

exports.getMyQuestionsAndAnswers = async (req, res, next) => {
	let postData = req.body;
	try { 
		const answerData = await QuestionsAndAnswers.find({user: postData.user_id, active: true}).sort({createdAt: -1});
		const answerDataCount = await QuestionsAndAnswers.find({user: postData.user_id, active: true}).count();
		res.status(200).json({
			status: 'success',
			results: answerData.length,
			data: answerData,
			totalItems: answerDataCount,
		});
	}
	catch (error) {
		res.status(404).json({
			status: 'error',
			message: error,
			response: { success: 0 }
		});
	}

}

exports.getQuestionsByTagName = async (req, res, next) => {

	let postData = req.body;

	try {
		let questionsByTag;
		let questionDataCount;
		if(postData.questionUserId != ''){
			questionsByTag = await QuestionsAndAnswers.find({user: postData.questionUserId, question: { $regex : new RegExp(postData.questionTag, "i") }, active: true}).sort({createdAt: -1});
			questionDataCount = await QuestionsAndAnswers.find({user: postData.questionUserId, question: { $regex : new RegExp(postData.questionTag, "i") }, active: true}).count();
		} else {
			questionsByTag = await QuestionsAndAnswers.find({question: { $regex : new RegExp(postData.questionTag, "i") }, active: true}).sort({createdAt: -1});
			questionDataCount = await QuestionsAndAnswers.find({question: { $regex : new RegExp(postData.questionTag, "i") }, active: true}).count();
		}

		res.status(200).json({
			status: 'success',
			results: questionsByTag.length,
			data: questionsByTag,
			totalItems: questionDataCount,
		});
	}
	catch (error) {
		res.status(404).json({
			status: 'error',
			message: error,
			response: { success: 0 }
		});
	}

}

exports.ansLikeDislike = async (req, res, next) => {
	let postData = req.body;
	var answer_id = postData.answer_id;
	var user_id = postData.user._id;
	const answerData = await answerModel.findOne({ _id: answer_id });
	try {
		if (postData.value == 1) {
			var index_dislike = answerData.dislikeUser.indexOf(user_id);
			if (index_dislike !== -1) {
				answerData.dislikeUser.splice(index_dislike, 1);
			}

			answerData.likedUser.push(user_id);
			let result = await answerModel.findOneAndUpdate(
				{ _id: answer_id },
				answerData
			);
		}
		else {
			var index_like = answerData.likedUser.indexOf(user_id);
			if (index_like !== -1) {
				answerData.likedUser.splice(index_like, 1);
			}
			answerData.dislikeUser.push(user_id);
			let result = await answerModel.findOneAndUpdate(
				{ _id: answer_id },
				answerData
			);
		}
		res.status(200).json({
			status: 'success',
			message: postData.value == 1 ? 'Liked successfully!' : 'Disliked successfully!',
			response: { success: 1 }
		});
	} catch (error) {
		res.status(404).json({
			status: 'error',
			message: error,
			response: { success: 0 }
		});
	}
}

exports.postAnswer = async (req, res, next) => {
	try {
		const answerModelquery = new answerModel({
			question_id: req.body.questionId,
			user: req.body.user,
			type: req.body.type,
			answerDescription: req.body.answerData
		});

		let likes = await answerModelquery.save();
		if (likes) {
			let qares = await QuestionsAndAnswers.findByIdAndUpdate(req.body.questionId, { "$push": { "answers": likes._id } },
				{ "new": true, "upsert": true });
			// console.log("qares : ",qares);
		}
		//await answerModel.create(data)
		res.status(200).json({
			status: 'success',
			message: 'Answer posted successfully!',
			response: { success: 1 },
			data: likes
		});
	} catch (error) {
		next(error)
	}
}

exports.getQuestionsAndAnswers = async (req, res, next) => {
	try {
		let questionAndAnswers = await answerModel
			.aggregate([
				{
					$group: {
						_id: '$question_id',
						answers: {
							$push: {
								user_id: '$user_id',
								answerDescription: '$answerDescription',
								likeCount: '$likeCount'
							}
						}
					}
				}
			])

		res.status(200).json({
			status: 'success',
			message: 'Questions and Answers!',
			response: questionAndAnswers
		});
	} catch (error) {
		res.next(error)
	}
}

exports.getUserQuestionsAndAnswers = async (req, res, next) => {
	//console.log("params : ",req.params);
	let filtersid = req.params.id.toString();
	const filter = { "User._id": filtersid };


	const data = await QuestionsAndAnswers.find({ "User": { _id: filtersid } });
	//	console.log("data : ",data);
	// SEND RESPONSE
	res.status(200).json({
		status: 'success',
		results: data.length,
		data: {
			data: data,
		},
	});
};

exports.delete_Question = async function (req, res, next) {
	try {
		const deleteQ = await QuestionsAndAnswers.deleteOne({ _id: req.params.id });
		if (deleteQ) {
			res.status(200).json({
				status: "success",
				message: "Question deleted successfully",
			});
		}
	}
	catch (e) {
		next(e);
	}
};
exports.delete_Answer = async function (req, res, next) {
	try {
		const deleteA = await answerModel.deleteOne({ _id: req.params.id });
		if (deleteA) {
			res.status(200).json({
				status: "success",
				message: "Answer deleted successfully",
			});
		}
	}
	catch (e) {
		next(e);
	}
};

exports.updateQuestions = async function (req, res, next) {
	try {
		let postDataGet = req.body;
		let questionId = ObjectId(postDataGet.questionId);
		const doc = await QuestionsAndAnswers.findByIdAndUpdate(questionId, req.body);
		if (!doc) return next(new AppError('No Document found with id', 404));
		res.status(200).json({
			status: 'success',
			message: "Question Updated successfully",
			data: {
				data: doc,
			},
		});
	}
	catch (e) {
		next(e);
	}
};


