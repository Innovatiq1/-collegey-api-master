// Importing Mongoose OBJECTID for validation
const { ObjectId } = require('mongoose').Types;

// Models
const Group = require('../../models/group');
const FutureSef = require('../../models/futureSelf');
const CollegyFeeds = require('../../models/CollegeyUniversalFeed');

// Default Functions
const factory = require('../factoryFunctions/handlerFactory');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

// using default factory functions (for admins)
exports.getAllGroups = factory.getAll(Group);
exports.getAllGroupCounter = factory.getAllCounter(Group);
exports.getGroup = factory.getOne(Group);
exports.createGroup = factory.createOne(Group);
exports.updateGroup = factory.updateOne(Group);
exports.deleteGroup = factory.deleteOne(Group);

exports.editGroupData = async (req, res) => {
	let postData = req.body;
	let where        = {_id:postData.group_id}
    let getGroupData = await Group.findOne(where); 
	let groupImage;
	if(postData.group_icon == null)
    {
        groupImage = getGroupData.groupIcon;
    }
    else
    { 
        groupImage = postData.group_icon;
    }
	let obj = {
		groupName: postData.groupName,
		description: postData.description,
		rules: postData.rules,
		groupType: postData.groupType,
		groupIcon: groupImage,
	};
	try {
        let result = await Group.findOneAndUpdate(
            {_id: ObjectId(postData.group_id) },
            obj
        );
		res.status(201).json({
			status: 'success',
			message: 'Update group successfully.'
		});
    } catch (error) {
		console.log("error",error);
        next(error);
    }
};

exports.deleteFeedsGroup = async (req, res) => {
	let postData = req.body;
	let where        = {_id:postData.group_id}
    let getGroupData = await Group.findOne(where); 
	try {
		let remove_group  	= await Group.deleteOne({_id:postData.group_id});
		let removeGroupPost = await CollegyFeeds.deleteMany({group:postData.group_id}); 
		res.status(201).json({
			status: 'success',
			message: 'Group Remove successfully.'
		});
    } catch (error) {
		console.log("error",error);
        next(error);
    }
};

// url defination
// router.route('/:followType/:id')
// User Functions
exports.groupfollowAndUnfollow = catchAsync(async (req, res, next) => {
	if (req.params.followType === 'follow' || req.params.followType === 'unfollow') {
		// 0 Custom defining const to be used
		const GroupId = req.params.id;
		const loggedInUserID = req.user._id.toString();

		// 1 Check if the id is a valid one
		if (!ObjectId.isValid(GroupId)) {
			return next(new AppError('Invalid ID', 400));
		}

		// 2 Check if your GroupId matches the id of group you wana follow
		const checkGroupExist = await Group.findById(GroupId).countDocuments();
		if (checkGroupExist === 0) {
			return next(new AppError('Group does not exist', 404));
		}

		// 3 when user wants to follow
		if (req.params.followType === 'follow') {
			// 1. check if the user is already followed
			const checkAlreadyFollowed = await Group.findOne({
				_id: GroupId,
				userList: {
					$elemMatch: {
						user: loggedInUserID,
					},
				},
			});
			if (checkAlreadyFollowed) {
				return next(new AppError('user already followed', 400));
			}

			// mongo query creation
			const query = {
				_id: GroupId,
			};

			const update = {
				$addToSet: { userList: { user: loggedInUserID } },
			};

			// Query One execution
			const updated = await Group.findOneAndUpdate(query, update, {
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
		} else if (req.params.followType === 'unfollow') {
			// 1. check if the user is already Unfollowed
			const checkAlreadyUnfollowed = await Group.findOne({
				_id: GroupId,
				userList: {
					$elemMatch: {
						user: loggedInUserID,
					},
				},
			});
			if (!checkAlreadyUnfollowed) {
				return next(new AppError('user already Unfollowed', 400));
			}

			// mongo query creation
			const query = {
				_id: GroupId,
			};

			const update = {
				$pull: { userList: { user: loggedInUserID } },
			};

			// Query One execution
			const updated = await Group.findOneAndUpdate(query, update, {
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
	} else if (req.params.followType === 'get') {
		console.log("dddddddddddddddddd",req.params.id);
		console.log("testss",req.query.filterName);
		// checking the ID is query
		const query = req.params.id === 'all' ? {} : { _id: req.params.id };

		let searchCondition = {};

		if(req.query.filterName != null && req.query.filterName != '')
		{
			let regex = new RegExp(req.query.filterName, "i");
			searchCondition["groupName"] = regex;
		}

		let aggreagte = [
			{
				$match: query,
			},
			{ $sort: { _id: -1 } },
			{
				$lookup: {
					from: "users",
					let: { 
						userid: "$userList.user",	
						},
					pipeline: [
							{ "$match": { "$expr": { $in: ["$_id", "$$userid"] }}},
							{ "$project": { "_id": 1, "name": 1 }}
					],	
					as: "userList",
				},
			},
			{
				$lookup: {
					from: "users",
					let: { 
						userid: "$groupJoinRequest",	
						},
					pipeline: [
							{ "$match": { "$expr": { $in: ["$_id", "$$userid"] }}},
							{ "$project": { "_id": 1, "name": 1 }}
					],	
					as: "groupJoinRequest",
				},
			},
			{ $match: searchCondition },
			{    
				$project: { 
				  _id:1,
				  active:1,
				  groupOwner:1,
				  createdAt:1,
				  description:1,
				  groupBanner:1,
				  groupIcon:1,
				  groupJoinRequest:"$groupJoinRequest",
				  groupName:1,
				  groupType:1,
				  rules:1,
				  userAdmin:1,
				  createdAt:1,
				  userList: "$userList",
				} 
			},  
			
		]
	
		var allUsers = await Group.aggregate(
			aggreagte
		);
	
		// GETs all users in a group
		//const doc = await Group.find(query);

		if (!allUsers) return next(new AppError('no document found with that ID', 404));

		res.status(200).json({
			status: 'success',
			results: allUsers.length,
			data: {
				data: allUsers,
			},
		});
	}else if (req.params.followType === 'getpagination') {
		// checking the ID is query
		const query = req.params.id === 'all' ? {} : { _id: req.params.id };

		let pageNo = parseInt(req.query.pageNo)
  		let size = parseInt(req.query.size)
  		if(pageNo < 0 || pageNo === 0) {
        	let response = {"error" : true,"message" : "invalid page number, should start with 1"};
        	return res.json(response)
  		}
		const limit = parseInt(size);
		const skip = size * (pageNo - 1);
		const doc = await Group.find().sort(
            { votes: -1, _id: 1 }).limit(limit).skip(skip)

		// GETs all users in a group
		const doc1 = await Group.find(query);

		if (!doc) return next(new AppError('no document found with that ID', 404));

		res.status(200).json({
			status: 'success',
			results: doc.length,
			data: {
				data: doc,
				totalItems: doc1.length,
			},
		});
	}
	// Send Error if the reqest does not match adding or removing followers
	else {
		return next(new AppError('Not a Valid request', 400));
	}
});
exports.futureSelf = async (req, res, next) => {

	console.log('-=-=-=->',req.body);
	try {
		// let postData = {
		// 	answerArray:[{
		// 	Answer: req.body.Answer,
		// 	Question: req.body.Question,
		// 	UserId:req.user._id,
		// 	questionId:req.body.questionId,
		// 	}]
		// }

		const acedamicLins =new FutureSef({
			UserId:req.user._id,
			answerArray:req.body.answerArray
		});

		let postData = req.body.answerArray;
		const acedamicBoxData = await acedamicLins.save();
 //if(projectDashboardProjects){}
 res.status(200).json({
	status: 'success',
	message: 'Inserted Successfully',
	data: {
		acedamicBoxData
	},
});
	} catch (error) {
		next(error);
	}
}

exports.all_GroupList = async function(req, res, next) {
	try{
		let postData = req.body;
		let limit = postData.limit || 10;
		let page = postData.page || 1;
		let skiprecord = limit * page - limit;

		let where = {};
		
		if(postData.searchByname != null && postData.searchByname != '')
		{
			let regex = new RegExp(postData.searchByname, "i");
			where["groupName"] = regex;
		}

		let aggregateQueryRem = [
			{ 
				$match:where  
			},
			{ $sort: {_id: -1} },
			{ $skip: skiprecord },
        	{ $limit: limit },
			{
				$lookup: {
					from: "users",
					let: { 
						userid: "$userList.user",	
						},
					pipeline: [
							{ "$match": { "$expr": { $in: ["$_id", "$$userid"] }}},
							{ "$project": { "_id": 1, "name": 1 }}
					],	
					as: "userList",
				},
			},
			{
				$lookup: {
					from: "users",
					let: { 
						userid: "$groupJoinRequest",	
						},
					pipeline: [
							{ "$match": { "$expr": { $in: ["$_id", "$$userid"] }}},
							{ "$project": { "_id": 1, "name": 1 }}
					],	
					as: "groupJoinRequest",
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'groupOwner',
					foreignField: '_id',
					as: 'owner'
				}
			},
			{
				$addFields: { groupCheckOwner: { $cond: { if: { $eq: ["$groupOwner", ObjectId(postData.user_id)] }, then: 1, else: 0} } }
			},
			{ $sort: {groupCheckOwner: -1} },
			{    
				$project: { 
				  _id:1,
				  active:1,
				  groupOwner:1,
				  createdAt:1,
				  description:1,
				  groupBanner:1,
				  groupIcon:1,
				  groupJoinRequest:"$groupJoinRequest",
				  groupName:1,
				  groupType:1,
				  rules:1,
				  userAdmin:1,
				  createdAt:1,
				  userList: "$userList",
				  groupOwnerName: {$arrayElemAt:["$owner.name",0],}
				} 
			},  
		]

		var all_group = await Group.aggregate(
			aggregateQueryRem
		);
		let totalrecord = await Group.find(where).count();

		res.status(200).json({
			status: "Success",
			message: "Fetch group successfully",
			data: all_group,
			'page':page,
			'totalrecord':totalrecord,
			'limit':limit,
		});

	}
	catch(error)
	{
		res.status(400).json({status:"Failed",message:"Failed to fetch group."});
	}
}

exports.groupOfMembers = async function(req, res, next) {
		// 0 Custom defining const to be used
		const loggedInUserID = req.user._id.toString();

		let searchCondition = {};

		if(req.query.filterName != null && req.query.filterName != '')
		{
			let regex = new RegExp(req.query.filterName, "i");
			searchCondition["groupName"] = regex;
		}

		let Allaggregate = [
			{
				$match: {
				  "userList.user": ObjectId(loggedInUserID)
				},
			},
			{
				$lookup: {
					from: "users",
					let: { 
						userid: "$userList.user",	
						},
					pipeline: [
							{ "$match": { "$expr": { $in: ["$_id", "$$userid"] }}},
							{ "$project": { "_id": 1, "name": 1 }}
					],	
					as: "userList",
				},
			},
			{ $match: searchCondition },
			{    
				$project: { 
				  _id:1,
				  active:1,
				  groupOwner:1,
				  createdAt:1,
				  description:1,
				  groupBanner:1,
				  groupIcon:1,
				  groupJoinRequest:1,
				  groupName:1,
				  groupType:1,
				  rules:1,
				  userAdmin:1,
				  userList: "$userList",
				} 
			},  
		];

		var fetchgroupData = await Group.aggregate(
			Allaggregate
		);
		
		try {
			res.status(200).json({
				status: 'success',
				data: fetchgroupData,
			});
		} catch (error) {
			next(error);
		}

		// const data = await Group.find({
		// 	userList: {
		// 		$elemMatch: {
		// 			user: loggedInUserID,
		// 		},
		// 	},
		// });

		// // Send Response
		// res.status(200).json({
		// 	status: 'success',
		// 	data,
		// });
	
};

exports.groupMembersUpdate = catchAsync(async (req, res, next) => {

		const data = await Group.findOne({
			_id:req.params.id,
		});
		if(data){
            let group = await Group.findByIdAndUpdate(req.params.id,{ "$push": { "userList": req.body} },
            { "new": true, "upsert": true });
			// Send Response
		res.status(200).json({
			status: 'success',
			group,
		});
		}
		

});
exports.getEachGroup = catchAsync(async (req, res, next) => {
	//console.log('test',req.params.id)

	const data = await Group.findOne({
		_id: req.params.id,
	});
		// Send Response
	res.status(200).json({
		status: 'success',
		data,
	});
	

});
exports.requestJoinMembers = catchAsync(async (req, res, next) => {

	const data = await Group.findOne({
		_id:req.params.id,
	});
	if(data){
		let group = await Group.findByIdAndUpdate(req.params.id,{ "$push": { "groupJoinRequest": req.body} },
		{ "new": true, "upsert": true });
		// Send Response
	res.status(200).json({
		status: 'success',
		group,
	});
	}
	

});
exports.acceptTojoin = catchAsync(async (req, res, next) => {
	// 0 Custom defining const to be used
		const groupId = req.params.id;
		const data = await Group.find({
			_id: groupId
		});
		if(data){
            let group = await Group.findByIdAndUpdate(req.params.id,{ "$pull": { "groupJoinRequest": req.body._id} },
            { "new": true, "upsert": true });
			if(group){
				const value = {user:req.body._id}
				let addMember = await Group.findByIdAndUpdate(req.params.id,{ "$push": { "userList": value} },
				{ "new": true, "upsert": true });
				res.status(200).json({
					status: 'success',
					addMember,
				});
			}
		}
	

});
exports.rejectTojoin = catchAsync(async (req, res, next) => {
	// 0 Custom defining const to be used
		const groupId = req.params.id;
		const data = await Group.find({
			_id: groupId
		});
		if(data){
            let group = await Group.findByIdAndUpdate(req.params.id,{ "$pull": { "groupJoinRequest": req.body._id} },
            { "new": true, "upsert": true });
			if(group){
				res.status(200).json({
					status: 'success',
					group,
				});
			}
		}
	

});