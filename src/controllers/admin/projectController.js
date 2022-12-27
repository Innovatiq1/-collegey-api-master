const Projects = require('../../models/Projects');

const factory = require('../factoryFunctions/handlerFactory');

const catchAsync = require('../../utils/catchAsync');

import mongoose from 'mongoose';

// using default factory functions

// exports.getAllProjects = factory.getAll(Projects);
 
exports.getAllProjects = async (req, res, next) => {

	let postData = req.query;
	let docLimit = postData.limit?postData.limit:10;
	let projectType = postData.projectType;
	let projectOwner = postData.projectOwner;
	let projectStatus = postData.projectStatus;
	let where = { projectType: projectType };

	if (projectType) {
		if (projectType == "mentors" || projectType == "collegey") {
			where =
			{
				$and:
					[
						{ "projectType": projectType },
						{
							"projectStatus":
							{
								$nin: ["new", "reject"]
							}
						},
					]
			}
		} else {
			where = { projectType: projectType }
		}
	} else if (projectOwner) {
		where =
		{
			$and:
				[
					{ "projectOwner": new mongoose.Types.ObjectId(projectOwner) },
					{
						"projectStatus":
						{
							$in: ["pending"]
						}
					},
				]
		}
	} else if (projectStatus) {
		where = { projectStatus: projectStatus }
	}


	let Allaggregate = [
		{
			$match: where,
		},
		{ $sort: { _id: -1 } },
		{
			$lookup: {
				from: 'users',
				localField: 'projectOwner',
				foreignField: '_id',
				as: 'projectOwner'
			}
		},
		{ $unwind: '$projectOwner' },
		{
			$lookup: {
				from: 'users',
				localField: 'mentor',
				foreignField: '_id',
				as: 'mentor'
			}
		},
		{ $unwind: '$mentor' },
		{
			$facet: {
				data: [{ $limit: docLimit }],
				pageInfo: [
					{
						$group: { _id: null, count: { $sum: 1 } },
					},
				],
			},
		},
		{
			$unwind: { path: "$pageInfo", preserveNullAndEmptyArrays: true },
		},
		{
			$project: {
				item: "$data",
				pageInfo: {
					count: '$pageInfo.count'
				}


			},
		},
	];

	var projectsByType = await Projects.aggregate(
		Allaggregate
	);

	try {
		if (projectsByType) {

			res.status(200).json({
				status: 'success',
				results: projectsByType[0].pageInfo.count,
				data: { data: projectsByType[0].item },
			});
		}
	} catch (error) {
		next(error);
	}
}

exports.fetchAllProjects = async (req, res, next) => {
	let postData = req.body;
	let projectType = postData.projectType;
	let projectOwner = postData.projectOwner;
	let projectStatus = postData.projectStatus;
	let where = { projectType: projectType, status: 1 };

	if (projectType) {
		if (projectType == "mentors" || projectType == "collegey") {
			where =
			{
				$and:
					[
						{ "projectType": projectType },
						{
							"projectStatus":
							{
								$nin: ["new", "reject", "completed"]
							}
						},
					],
				status: 1
			}
			if (postData.projectFilter.projectTag.length > 0 && postData.projectFilter.country != '') {
				where =
				{
					$and:
						[
							{ "projectType": projectType },
							{
								"projectStatus":
								{
									$nin: ["new", "reject", "completed"]
								}
							},
							{ "keyword": { "$in": postData.projectFilter.projectTag } },
							{ "location": { "$regex": postData.projectFilter.country } },
						],
					status: 1
				}
			}
			if (postData.projectFilter.projectTag.length > 0 && postData.projectFilter.country == '') {
				where =
				{
					$and:
						[
							{ "projectType": projectType },
							{
								"projectStatus":
								{
									$nin: ["new", "reject", "completed"]
								}
							},
							{ "keyword": { "$in": postData.projectFilter.projectTag } },
						],
					status: 1
				}
			}
			if (postData.projectFilter.projectTypeArray != '' && postData.projectFilter.projectTag.length < 0) {
				where =
				{
					$and:
						[
							{ "projectType": postData.projectFilter.projectTypeArray },
							{
								"projectStatus":
								{
									$nin: ["new", "reject", "completed"]
								}
							},
						],
					status: 1
				}
			}
		} else {
			where = { projectType: projectType }
		}
	} else if (projectOwner) {
		where =
		{
			$and:
				[
					{ "projectOwner": new mongoose.Types.ObjectId(projectOwner) },
					{
						"projectStatus":
						{
							$in: ["pending"]
						}
					},
				],
			status: 1
		}
	}
	else if (projectStatus == 'completed') {
		where =
		{
			$and:
				[
					{
						'$or':
							[
								{ projectOwner: new mongoose.Types.ObjectId(postData.userId) },
								{
									projectMembers:
									{
										$in: [new mongoose.Types.ObjectId(postData.userId)]
									}
								}
							]
					},
					{ projectStatus: 'completed' }
				],
			status: 1
		}
	}
	else if (projectStatus) {
		where = { projectStatus: projectStatus, status: 1 }
	}
	
	let Allaggregate = [
		{
			$match: where,
		},
		{ $sort: { _id: -1 } },
		{
			$lookup: {
				from: 'users',
				localField: 'projectOwner',
				foreignField: '_id',
				as: 'projectOwner'
			}
		},
		{
            $unwind: { path: "$projectOwner", preserveNullAndEmptyArrays: true },
        },
		{
			$lookup: {
				from: 'users',
				localField: 'mentor',
				foreignField: '_id',
				as: 'mentor'
			}
		},
		{
            $unwind: { path: "$mentor", preserveNullAndEmptyArrays: true },
        },
		{
			$lookup: {
				from: 'user_projects',
				localField: '_id',
				foreignField: 'project_id',
				as: 'countdatat'
			}
		},
		{ $addFields: {projectAvailableSlot	: {$size: "$countdatat"}}},
		{
			$lookup: {
				from: 'user_watchlists',
				localField: '_id',
				foreignField: 'project_id',
				as: 'watchlist'
			}
		},
		{ $unwind: { path: "$watchlist",  preserveNullAndEmptyArrays: true }  },
		{
			$facet: {
				data: [],
				pageInfo: [
					{
						$group: { _id: null, count: { $sum: 1 } },
					},
				],
			},
		},	
		{
			$unwind: { path: "$pageInfo", preserveNullAndEmptyArrays: true },
		},
		{
			$project: {
				item: "$data",
				pageInfo: {
					count: '$pageInfo.count'
				}


			},
		},
	
	];

	var projectsByType = await Projects.aggregate(
		Allaggregate
	);

	try {
		if (projectsByType) {

			res.status(200).json({
				status: 'success',
				results: projectsByType[0].pageInfo.count,
				data: { data: projectsByType[0].item },
			});
		}
	} catch (error) {
		next(error);
	}
}

exports.getAllProjectCounter = factory.getAllCounter(Projects);
exports.getProject = factory.getOne(Projects);
exports.createProject = factory.createOne(Projects);
exports.updateProject = factory.updateOne(Projects);
exports.deleteProject = factory.deleteOne(Projects);

exports.getUserIdToProjectOwner = catchAsync(async (req, res, next) => {
	req.body.projectOwner = req.user._id;
	req.body.projectType = req.user.type === 'admin' ? 'collegey' : req.user.type;
	next();
});
