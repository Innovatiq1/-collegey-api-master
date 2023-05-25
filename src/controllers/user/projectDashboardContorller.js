import { userPostServices, userGetServices } from '../../services/userServices';

import { projectDashboardGetServices, projectDashboardPostServices } from '../../services/projectDashboard.service';

import { getFields } from '../../utilities/helpers';
import { statusTypes } from '../../utilities/constant_variables';
import { studentsQuestions } from '../../utilities/constants';
var objectPath = require('object-path');
import { emailType, sendEmail } from '../../utilities/emailHelper';
import mongoose from 'mongoose';

// Load modal
import ProjectsModel from '../../models/Projects';
import ProgramModel from '../../models/Programs';
import userProjectModel from '../../models/userProjects';
import userProgramModel from '../../models/userPrograms';

import programesPaymentHistory  from '../../models/transactions/programsPaymentHistory';

import userModel from '../../models/User';
import RewardsPoint from '../../models/rewardspoint';
import BillingModel from '../../models/billing-data/billing-data';
import projectOutcomes from '../../models/projectOutcome';

const request = require('request-promise');
const cheerio = require('cheerio');
import InviteesProject from '../../models/Invitees-project';
import studentInterests from '../../models/studentInterests';
import studentSubject from '../../models/studentSubject';
import UserPrograms from '../../models/userPrograms'
const { ObjectId } = require('bson');

// Stript Payment
import { createUserOnStripe, creditAmoutOfStripeUser } from "../../utilities/stripe/stripe";

exports.getProjetsInvitee = async (req, res, next) => {
	try {
		let email = req.body.useremailid
		let projectId = req.body.projectId
		let postData = {
			email: req.body.useremailid,
			projectID: req.body.projectId,
			requestedForName: req.body.requestedForName,
		}
		const current_userData = await userModel.findOne({ _id: ObjectId(req.body.user_id) });

		let projectDashboardProjects = await projectDashboardGetServices.getProjectsByInvitee(email, projectId);
		//let projectInvitedData = await projectDashboardGetServices.postInviteData(postData, userId)
		//console.log("======",projectDashboardProjects.projectID)
		let userData = await projectDashboardGetServices.getProjectsUserInvitee(email);
		let userId;
		if (userData.length > 0) {
			userId = userData && userData[0]._id
		}
		if (projectDashboardProjects.length > 0) {

			if (userData.length > 0) {
				var project_mailObj4 = {
					refer_by: current_userData.name + ' ' + current_userData.last_name,
					refer_id: projectDashboardProjects[0].projectID,
					email: req.body.useremailid,
					name: req.body.requestedForName,
					user_exists: 'yes',
				};
				sendEmail(emailType.PROJECT_REFFERAL_INVITE, project_mailObj4);

			}
			else {

				var project_mailObj1 = {
					refer_by: current_userData.name + ' ' + current_userData.last_name,
					refer_id: projectDashboardProjects[0].projectID,
					email: req.body.useremailid,
					name: req.body.requestedForName,
					user_exists: 'no',
				};
				//console.log("======",project_mailObj1)

				sendEmail(emailType.PROJECT_REFFERAL_INVITE, project_mailObj1);

			}
			// let project_mailObj = {
			// 	project_name: "test",
			// 	email: postData.email,
			// };
			//sendEmail(emailType.NEW_PROJECT_ADD_EMAIL, project_mailObj);
			res.status(200).json({
				status: 'InviteeId Already Exists',
				message: 'InviteeId Already Exists',
				data: {
					projectDashboardProjects
				},
			});

		} else {
			console.log("heloo",userData);
			if (userData.length > 0) {
				userId = userData && userData[0]._id
			}
			var projectInvitedData = await projectDashboardGetServices.postInviteData(postData, userId)
			//console.log("===projectInvitedData==",projectInvitedData.length)
			//console.log("===========",JSON.stringify(projectInvitedData))
			console.log("projectInvitedData",projectInvitedData);
			if (projectInvitedData && userId) {
				//console.log("+=================")

				var project_mailObj = {
					refer_by: current_userData.name + ' ' + current_userData.last_name,
					refer_id: projectInvitedData.projectID,
					email: req.body.useremailid,
					name: req.body.requestedForName,
					user_exists: 'yes',
				};
				//console.log("=======dddddddddd=====",project_mailObj)
				sendEmail(emailType.PROJECT_REFFERAL_INVITE, project_mailObj);

			} else if (projectInvitedData && !userId) {
				var project_mailObj2 = {
					refer_by: current_userData.name + ' ' + current_userData.last_name,
					refer_id: projectInvitedData.projectID,
					email: req.body.useremailid,
					name: req.body.requestedForName,
					user_exists: 'no',
				};
				sendEmail(emailType.PROJECT_REFFERAL_INVITE, project_mailObj2);
				//sendEmail(emailType.STUDENT_WELCOME_EMAIL, postData);
				//   sendEmail(emailType.PROJECT_SIGNUP_EMAIL, postData);					
				//  sendEmail(emailType.NEW_MEMBER_REFFERED_EMAIL, postData);					
				// sendEmail(emailType.INVITATION_EMAIL, postData);
				// sendEmail(emailType.STUDENT_PROJECT_APPOROVAL_INVITE, projectInvitedData);
			}

			// res.status(200).json({
			// 	status: 'success',
			// 	message: 'Password reset link sent | Please check your mail for further instructions',
			// 	token: '',
			// });
			res.status(200).json({
				status: 'success',
				message: 'Invitee Id Inserted Successfully',
				data: {
					projectInvitedData
				},
			});

		}
	} catch (error) {
		next(error);
	}
}
exports.getProgramInvitee = async (req, res, next) => {
	try {
		let email = req.body.useremailid
		let programId = req.body.programId
		let postData = {
			email: req.body.useremailid,
			programId: req.body.programId,
			requestedForName: req.body.requestedForName,
		}
		const current_userData = await userModel.findOne({ _id: ObjectId(req.body.user_id) });

		let projectDashboardProjects = await projectDashboardGetServices.getProgramsByInvitee(email, programId);
		//let projectInvitedData = await projectDashboardGetServices.postInviteData(postData, userId)
		//console.log("======",projectDashboardProjects.projectID)
		let userData = await projectDashboardGetServices.getProjectsUserInvitee(email);
		let userId;
		if (userData.length > 0) {
			userId = userData && userData[0]._id
		}

		
		if (projectDashboardProjects.length > 0) {

			if (userData.length > 0) {
				var project_mailObj4 = {
					refer_by: current_userData.name + ' ' + current_userData.last_name,
					refer_id: projectDashboardProjects[0].programID,
					email: req.body.useremailid,
					name: req.body.requestedForName,
					user_exists: 'yes',
				};
				sendEmail(emailType.PROJECT_REFFERAL_INVITE, project_mailObj4);

			}
			else {

				var project_mailObj1 = {
					refer_by: current_userData.name + ' ' + current_userData.last_name,
					refer_id: projectDashboardProjects[0].programID,
					email: req.body.useremailid,
					name: req.body.requestedForName,
					user_exists: 'no',
				};
				//console.log("======",project_mailObj1)

				sendEmail(emailType.PROJECT_REFFERAL_INVITE, project_mailObj1);

			}
			// let project_mailObj = {
			// 	project_name: "test",
			// 	email: postData.email,
			// };
			//sendEmail(emailType.NEW_PROJECT_ADD_EMAIL, project_mailObj);
			res.status(200).json({
				status: 'InviteeId Already Exists',
				message: 'InviteeId Already Exists',
				data: {
					projectDashboardProjects
				},
			});

		} else {
			console.log("heloo",userData);
			if (userData.length > 0) {
				userId = userData && userData[0]._id
			}
			var projectInvitedData = await projectDashboardGetServices.postInviteProgramData(postData, userId)
			//console.log("===projectInvitedData==",projectInvitedData.length)
			//console.log("===========",JSON.stringify(projectInvitedData))
			console.log("projectInvitedData",projectInvitedData);
			if (projectInvitedData && userId) {
				//console.log("+=================")

				var project_mailObj = {
					refer_by: current_userData.name + ' ' + current_userData.last_name,
					refer_id: projectInvitedData.projectID,
					email: req.body.useremailid,
					name: req.body.requestedForName,
					user_exists: 'yes',
				};
				//console.log("=======dddddddddd=====",project_mailObj)
				sendEmail(emailType.PROJECT_REFFERAL_INVITE, project_mailObj);

			} else if (projectInvitedData && !userId) {
				var project_mailObj2 = {
					refer_by: current_userData.name + ' ' + current_userData.last_name,
					refer_id: projectInvitedData.projectID,
					email: req.body.useremailid,
					name: req.body.requestedForName,
					user_exists: 'no',
				};
				sendEmail(emailType.PROJECT_REFFERAL_INVITE, project_mailObj2);
				//sendEmail(emailType.STUDENT_WELCOME_EMAIL, postData);
				//   sendEmail(emailType.PROJECT_SIGNUP_EMAIL, postData);					
				//  sendEmail(emailType.NEW_MEMBER_REFFERED_EMAIL, postData);					
				// sendEmail(emailType.INVITATION_EMAIL, postData);
				// sendEmail(emailType.STUDENT_PROJECT_APPOROVAL_INVITE, projectInvitedData);
			}

			// res.status(200).json({
			// 	status: 'success',
			// 	message: 'Password reset link sent | Please check your mail for further instructions',
			// 	token: '',
			// });
			res.status(200).json({
				status: 'success',
				message: 'Invitee Id Inserted Successfully',
				data: {
					projectInvitedData
				},
			});

		}
	} catch (error) {
		next(error);
	}
}

exports.getProjetsInterests = async (req, res, next) => {
	console.log("======", req.user._id
	)
	try {
		let postData = {
			interest: req.body.ininterest,


		}
		console.log("====", postData)
		let projectDashboardProjects = await projectDashboardGetServices.getProjectsByInterets(postData);
		res.status(200).json({
			status: 'success',
			message: 'Inserted Successfully',
			data: {
				projectDashboardProjects
			},
		});
	} catch (error) {
		next(error);
	}
}
exports.postProjetsSubject = async (req, res, next) => {
	try {
		let postData = {
			subject: req.body.subject
		}
		console.log("====", postData)
		let projectDashboardProjects = await projectDashboardGetServices.postProjectsBySubject(postData);
		res.status(200).json({
			status: 'success',
			message: 'Inserted Successfully',
			data: {
				projectDashboardProjects
			},
		});
	} catch (error) {
		next(error);
	}
}

exports.postProjetsOutcome = async (req, res, next) => {
	try {
		let postData = {
			outcome: req.body.outcome
		}
		console.log("====", postData)
		let projectOutcomes = await projectDashboardGetServices.postProjectOutcomes(postData);
		res.status(200).json({
			status: 'success',
			message: 'Inserted Successfully',
			data: {
				projectOutcomes
			},
		});
	} catch (error) {
		next(error);
	}
}
exports.getProjetsInterestsList = async (req, res, next) => {
	try {
		let projectDashboardProjects = await studentInterests.find();

		res.status(200).json({
			status: 'success',
			message: 'Interested Fetch Successfully',
			data: {
				projectDashboardProjects

			},
		});
	} catch (error) {
		next(error);
	}
}
exports.getMentor = async (req, res, next) => {
	let cid = ObjectId(req.body.id)
	try {
		let mentor = await userModel.findOne({ _id: cid });

		res.status(200).json({
			status: 'success',
			message: 'mentor Fetch Successfully',
			data: {
				mentor

			},
		});
	} catch (error) {
		next(error);
	}
}
exports.postProjetsSubjectList = async (req, res, next) => {
	try {

		let projectDashboardProjects = await studentSubject.find();

		res.status(200).json({
			status: 'success',
			message: 'subject Fetch Successfully',
			data: {
				projectDashboardProjects

			},
		});
	} catch (error) {
		next(error);
	}
}
exports.projectOutcomeList = async (req, res, next) => {
	try {

		let outcomes = await projectOutcomes.find();

		res.status(200).json({
			status: 'success',
			message: 'outcomes Fetch Successfully',
			data: {
				outcomes

			},
		});
	} catch (error) {
		next(error);
	}
}

exports.getAllUserProjects = async (req, res, next) => {
	let postData = req.body;
	let userId = postData.user_id;
	let where = { user_id: ObjectId(userId), status: 1 };

	let filterConditions = {};
	if (postData.projectFilter.projectTypeArray != '') {
		filterConditions = { "projectdata.projectType": postData.projectFilter.projectTypeArray };
	}
	if (postData.projectFilter.projectTag.length > 0) {
		filterConditions = { "projectdata.keyword": { "$in": postData.projectFilter.projectTag } };
	}
	if (postData.projectFilter.country != '' && postData.projectFilter.country != null) {
		filterConditions = { "projectdata.location": { "$regex": postData.projectFilter.country } };
	}

	userProjectModel.aggregate(
		[
			{
				$match: where,
			},
			{ $sort: { _id: -1 } },
			{
				$lookup: {
					from: "projects",
					let: { project_id: "$project_id" },
					pipeline: [
						{
							$match: {
								$expr: { $eq: ["$_id", "$$project_id"] },
								projectStatus: { $nin: ['completed'] }
							},
						},
						{
							$lookup: {
								from: 'users',
								localField: 'projectMembers',
								foreignField: '_id',
								as: 'projectMembers'
							}
						},
						{
							$lookup: {
								from: 'users',
								localField: 'mentor',
								foreignField: '_id',
								as: 'mentor'
							}
						},
						{ $unwind: { path: "$mentor",  preserveNullAndEmptyArrays: true }  },
						{
							$lookup: {
							  from: "user_watchlists",
							  let: { userid: mongoose.Types.ObjectId(req.user.id),projectId: '$_id'},
							  pipeline: [
								{
								  $match: {
									$expr: {
									  $and: [
										{ $eq: ["$user_id", "$$userid"] },
										{ $eq: ["$project_id", "$$projectId"] },
									  ],
									},
								  },
								},
							  ],
							  as: "watchlist",
							},
						}, 
						{ $unwind: { path: "$watchlist",  preserveNullAndEmptyArrays: true }  },
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
								from: 'user_projects',
								localField: '_id',
								foreignField: 'project_id',
								as: 'countdatat'
							}
						},
						{ $addFields: { projectAvailableSlot: { $size: "$countdatat" } } },
						{
							$project: {
								projectAvailableSlot: 1,
								Milestones: 1,
								projectMembers: 1,
								mentor: 1,
								watchlist:1,
								projectOwner: 1,
								active: 1,
								ask_questions: 1,
								contact_person: 1,
								can_be_done: 1,
								createdAt: 1,
								description: 1,
								documents: 1,
								end_date: 1,
								hash_tags: 1,
								id: 1,
								ifPartnerProjectTrue: 1,
								image: 1,
								impact: 1,
								keyword: 1,
								location: 1,
								mentor: 1,
								partner: 1,
								projectComments: 1,
								projectCommentsDummy: 1,
								projectEvent: 1,
								projectMembers: 1,
								projectOwner: 1,
								projectPaymentUser: 1,
								projectPlan: 1,
								projectPost: 1,
								projectPrice: 1,
								projectStatus: 1,
								projectType: 1,
								projectfees: 1,
								projectReview: 1,
								questions: 1,
								remainingSlot: 1,
								sdg: 1,
								skills: 1,
								slug: 1,
								start_date: 1,
								status: 1,
								studentMilestones: 1,
								students_count: 1,
								title: 1,
								updatedAt: 1,
								willing_to_consider: 1,
								status: 1,
								requestMentor:1,
								acceptMentorInvitation: 1,
							},
						},
					],
					as: "projectdata",
				},
			},
			{
				$unwind: "$projectdata"
			},
			{
				$match: filterConditions,
			},
			{
				$project: {
					_id: 1,
					project_id: 1,
					project: "$projectdata",
				}
			},
		], function (err, projectDashboardProjects) {
			if (err) {
				next(err);
			} else {
				return res.status(200).json({
					status: 'success',
					message: 'Dashboard info',
					data: {
						projectDashboardProjects
					},
				});
			}
		});

}
exports.progamesList = async (req, res, next) => {
	let postData = req.body;
	let userId   = postData.user_id;
	let where = {user_id: ObjectId(userId),programStatus:"InProgress"};

	let Programaggregate = [ 
		{  
			$match: where,
		},
		{
			$lookup:{
				from: 'programs',
				localField: 'program_id', 
				foreignField: '_id',
				as: 'Programdata'
			}
		},
		{
			$unwind: { path: "$Programdata", preserveNullAndEmptyArrays: true }
		},
	];

	var program = await userProgramModel.aggregate(
		Programaggregate
	).sort({_id:-1});
	res.status(200).json({
		status: 'success',
		program,
	});
 
}
exports.completedprogamesList = async (req, res, next) => {
	let postData = req.body;
	let userId = postData.user_id;
	let where = {user_id: ObjectId(userId),programStatus:"completed"};
	
	let Programaggregate = [ 
		{  
			$match: where,
		},
		{
			$lookup:{
				from: 'programs',
				localField: 'program_id', 
				foreignField: '_id',
				as: 'Programdata'
			}
		},
		{
			$unwind: { path: "$Programdata", preserveNullAndEmptyArrays: true }
		},
	];

	var program = await userProgramModel.aggregate(
		Programaggregate
	);
	res.status(200).json({
		status: 'success',
		program,
	});

}

exports.getAllPendingProjectByStudent = async (req, res, next) => {

	let postData = req.body;
	let userId = postData.user_id;

	let where =
	{
		'$and':
			[
				{
					'$or':
						[
							{ projectOwner: new mongoose.Types.ObjectId(userId) },
							{ mentor: new mongoose.Types.ObjectId(userId) }
						]
				},
				{ 'projectStatus': 'new' }
			]
	}

	let Allaggregate = [
		{
			$match: where,
		},
		{ $sort: { _id: -1 } },
		{

			$lookup: {
				from: 'users',
				localField: 'mentor',
				foreignField: '_id',
				as: 'mentor'
			}
		},
		{
			$unwind: { path: "$mentor", preserveNullAndEmptyArrays: true }
		},
		{

			$lookup: {
				from: 'users',
				localField: 'projectOwner',
				foreignField: '_id',
				as: 'projectOwner'
			}
		},
		{
			$unwind: { path: "$projectOwner", preserveNullAndEmptyArrays: true }
		},
		{
			$lookup: {
				from: 'user_projects',
				localField: '_id',
				foreignField: 'project_id',
				as: 'countdatat'
			}
		},
		{ $addFields: { projectAvailableSlot: { $size: "$countdatat" } } },
		{
			$lookup: {
			  from: "user_watchlists",
			  let: { userid: mongoose.Types.ObjectId(userId),projectId: '$_id'},
			  pipeline: [
				{
				  $match: {
					$expr: {
					  $and: [
						{ $eq: ["$user_id", "$$userid"] },
						{ $eq: ["$project_id", "$$projectId"] },
					  ],
					},
				  },
				},
			  ],
			  as: "watchlist",
			},
		},
		{ $unwind: { path: "$watchlist",  preserveNullAndEmptyArrays: true }  },
	];

	var projectDashboardProjects = await ProjectsModel.aggregate(
		Allaggregate
	);
		
	try {
		if (projectDashboardProjects) {
			res.status(200).json({
				status: 'success',
				message: 'Dashboard info',
				data: {
					projectDashboardProjects
				},
			});
		}
	} catch (error) {
		next(error);
	}
}


exports.getProjectDetails = async (req, res, next) => {
	try {
		let projectId = req.params.id;
		let projectDetails = await projectDashboardGetServices.getProjectDetails(projectId);
		if (projectDetails) {
			res.status(200).json({
				status: 'success',
				message: 'Dashboard info',
				data: {
					projectDetails
				},
			});
		}
	} catch (error) {
		next(error);
	}
}

exports.deleteProjectPost = async (req, res, next) => {
	try {
		let projectId = req.body.projectId;
		let postId = req.body.postId;

		let projectPostDetails = await ProjectsModel.findOneAndUpdate(
			{ _id: projectId },
			{
				$pull:
				{
					projectPost: { _id: postId }
				}
			});

		if (projectPostDetails) {
			res.status(200).json({
				status: 'success',
				message: 'Post deleted',
				data: {
					projectPostDetails
				},
			});
		}
	} catch (error) {
		next(error);
	}
}
exports.deleteProgramPost = async (req, res, next) => {
	try {
		let programId = req.body.programId;
		let postId = req.body.postId;
		console.log("=====,",programId)
		console.log("=====,",postId)

		let programPostDetails = await ProgramModel.findOneAndUpdate(
			{ _id: programId },
			{
				$pull:
				{
					programPost: { _id: postId }
				}
			});
			console.log("=========",programPostDetails)

		if (programPostDetails) {

			res.status(200).json({
				status: 'success',
				message: 'Post deleted',
				data: {
					programPostDetails
				},
			});
		}
	} catch (error) {
		next(error);
	}
}


exports.postproject = async (req, res, next) => {
	try {
		let projectId = req.body.id;
		let projectDetails = await projectDashboardGetServices.getProject(projectId);
		if (projectDetails) {
			res.status(200).json({
				status: 'success',
				message: 'Dashboard info',
				data: {
					projectDetails
				},
			});
		}
	} catch (error) {
		next(error);
	}
}

exports.getProjectChats = async (req, res, next) => {
	try {
		let projectId = req.params.id;
		let projectChats = await projectDashboardGetServices.getProjectChats(projectId);
		if (projectChats) {
			res.status(200).json({
				status: 'success',
				message: 'Dashboard info',
				data: {
					projectChats
				},
			});
		}
	} catch (error) {
		next(error);
	}
}
exports.getProgramChats = async (req, res, next) => {
	try {
		let projectId = req.params.id;
		let projectChats = await projectDashboardGetServices.getProgramChats(projectId);
		if (projectChats) {
			res.status(200).json({
				status: 'success',
				message: 'Dashboard info',
				data: {
					projectChats
				},
			});
		}
	} catch (error) {
		next(error);
	}
}


exports.getProjectFiles = async (req, res, next) => {
	try {
		let projectId = req.params.id;
		let projectFiles = await projectDashboardGetServices.getProjectFiles(projectId);
		if (projectFiles) {
			res.status(200).json({
				status: 'success',
				message: 'Dashboard info',
				data: {
					projectFiles
				},
			});
		}
	} catch (error) {
		next(error);
	}
}
exports.getProgramFiles = async (req, res, next) => {
	try {
		let programId = req.params.id;
		let programFiles = await projectDashboardGetServices.getProgramFiles(programId);
		if (programFiles) {
			res.status(200).json({
				status: 'success',
				message: 'Dashboard info',
				data: {
					programFiles
				},
			});
		}
	} catch (error) {
		next(error);
	}
}


exports.deleteProjectFiles = async (req, res, next) => {
	try {
		let { id, project, user } = req.body;

		let projectFiles = await projectDashboardPostServices.deleteProjectFile({ project: project, user: user, _id: id });
		if (projectFiles) {
			res.status(200).json({
				status: 'success',
				message: 'File Deleted Successfully',
				data: {
					projectFiles
				},
			});
		}
	} catch (error) {
		next(error);
	}
}

exports.deleteProgramFiles = async (req, res, next) => {
	console.log("=========",req.body)
	try {
		let { id, program, user } = req.body;
		

		let programFiles = await projectDashboardPostServices.deleteProgramFile({ program: program, user: user, _id: id });
		if (programFiles) {
			res.status(200).json({
				status: 'success',
				message: 'File Deleted Successfully',
				data: {
					programFiles
				},
			});
		}
	} catch (error) {
		next(error);
	}
}


exports.postNewProject = async (req, res) => {
	let postData = req.body;
	let projectSlug = postData.name.replace(/[^A-Z0-9]/ig, "-").toLowerCase();
	const projectlins = new ProjectsModel({
		title: postData.name,
		slug: projectSlug,
		image: postData.project_img,
		projectStatus: 'new',
		keyword: postData.keyword,
		start_date: postData.startDate,
		end_date: postData.lastDate,
		location: postData.location,
		students_count: postData.student_num,
		remainingSlot: postData.student_num,
		sdg: postData.sdg,
		projectOwner: postData.user_id,
		mentor: null,
		description: postData.aboutProject,
		Milestones: postData.milestones[0],
		studentOutcome: postData.outcomes,
		"projectPrice.amount": postData.projectfess,
		"contact_person.name": postData.username,
		"contact_person.email": postData.useremail,

		"projectPlan.week1Duration": postData.week1Duration,
		"projectPlan.week2Duration": postData.week2Duration,
		"projectPlan.week3Duration": postData.week3Duration,
		"projectPlan.week4Duration": postData.week4Duration,
		"projectPlan.week5Duration": postData.week5Duration,
		"projectPlan.week6Duration": postData.week6Duration,
		
		"projectPlan.month3Duration": postData.month3Duration,
		"projectPlan.month4Duration": postData.month4Duration,
		"projectPlan.month5Duration": postData.month5Duration,
		"projectPlan.month6Duration": postData.month6Duration,
		"projectPlan.month7Duration": postData.month7Duration,
		"projectPlan.month8Duration": postData.month8Duration,
		"projectPlan.month9Duration": postData.month9Duration,
	});
	try {
		const projectData = await projectlins.save();
		let project_mailObj = {
			project_name: postData.name,
			email: postData.useremail,
		};
		sendEmail(emailType.NEW_PROJECT_ADD_EMAIL, project_mailObj);
		res.status(200).json({
			status: 'Success',
			message: 'submmited to admin for approval',
		});
	}
	catch (error) {
		console.log(error);
		// next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Project faild',
		});
	}
}

exports.payForpaidProject = async (req, res) => {
	let postData = req.body;

	let condition = {
		isDeleted: false,
		mainUserId: ObjectId(postData.user_id),
	};

	let fetchbillingData = await BillingModel.findOne(condition);

	// Find the user data
	const usertData = await userModel.findOne({ _id: postData.user_id });
	const projectData = await ProjectsModel.findOne({ _id: postData.project_id });

	let obj = { cardToken: postData.cardToken, email: usertData.email, name: usertData.name, last_name: usertData.last_name };

	let stripeCustomerId = "";

	if (fetchbillingData) {
		stripeCustomerId = fetchbillingData.stripeCustomerId;
	}
	else {
		const stripeUser = await createUserOnStripe(obj);
		if (!stripeUser["status"]) {
			throw new Error("Token already used");
		}
		stripeCustomerId = stripeUser["customer"]["id"];

		//Add to billing

		const billingObject = new BillingModel({
			mainUserId: postData.user_id,
			stripeCustomerId: stripeCustomerId,
			createdBy: postData.user_id,
			createdAt: Date.now(),
			isDeleted: false,
		});
		let billingData = await billingObject.save();

	}


	const afterPayment = await creditAmoutOfStripeUser({
		id: stripeCustomerId,
		total: projectData.projectPrice.amount * 100,
		description: "Project Payment",
	});

	if (!afterPayment["status"]) {
		throw new Error("User not register on stripe");
	}

	res.status(200).json({
		status: 'Success',
		message: 'Payment Successfully',
		response: afterPayment,
	});
}

exports.postNewProjectPost = async (req, res) => {
	let postData = req.body;
	const url_data = postData.post_url;
	const projectData = await ProjectsModel.findOne({ _id: postData.project });

	if (typeof postData.post_url === 'undefined' || postData.post_url == '' && postData.postImageUrl != '') {

		var postCreated = [];
		if (postData.postImageUrl !== '' && postData.postImageUrl !== null && typeof postData.postImageUrl !== 'undefined') {
			var upObj = {
				postText: postData.postText,
				postComment: '',
				postData: postData.post_comment,
				postImageUrl: postData.postImageUrl,
				posturl: '',
				postBy: postData.user,
				postType: 'image',
				createdAt: Date.now(),
			};
			postCreated.push(upObj);
		}
		else {
			var upObj = {
				postText: postData.postText,
				postComment: '',
				postData: postData.post_comment,
				posturl: '',
				postBy: postData.user,
				postType: 'text',
				createdAt: Date.now(),
			};
			postCreated.push(upObj);
		}
		try {
			let result = await ProjectsModel.findOneAndUpdate(
				{ _id: postData.project },
				{ $push: { "projectPost": { $each: postCreated, $position: 0 } } }
			);
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}
		catch (error) {
			res.status(400).json({
				status: 'error',
				message: 'Post add faild',
			});
		}
	}
	else if (typeof postData.post_url !== 'undefined' && postData.post_url !== '' && postData.postImageUrl !== '' && postData.postImageUrl !== null) {
		var postCreated = [];
		var upObj = {
			postText: postData.postText,
			postComment: '',
			postData: postData.post_comment,
			postImageUrl: postData.postImageUrl,
			posturl: '',
			postBy: postData.user,
			postType: 'image',
			createdAt: Date.now(),
		};
		postCreated.push(upObj);
		try {
			let result = await ProjectsModel.findOneAndUpdate(
				{ _id: postData.project },
				{ $push: { "projectPost": { $each: postCreated, $position: 0 } } }
			);
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}
		catch (error) {
			res.status(400).json({
				status: 'error',
				message: 'Post add faild',
			});
		}
	}
	else {
		request(url_data).then(async function (html) {
			//success! 
			var $ = cheerio.load(html),
				title = $('head title').text(),
				$desc = $('meta[name="description"]').attr('content'),
				$ogTitle = $('meta[property="og:title"]').attr('content'),
				$ogImage = $('meta[property="og:image"]').attr('content'),
				$images = $('img');

			if ($ogTitle == '') {
				return res.status(400).json({
					status: 'error',
					message: 'Please add valid Post url',
				});
			}

			var postCreated = [];
			let upObj = {
				postText: postData.postText,
				postComment: postData.post_comment,
				postData: $ogTitle,
				postImageUrl: $ogImage,
				posturl: url_data,
				postBy: postData.user,
				postType: 'image',
				createdAt: Date.now(),
			};
			postCreated.push(upObj);

			let result = await ProjectsModel.findOneAndUpdate(
				{ _id: postData.project },
				{ $push: { "projectPost": { $each: postCreated, $position: 0 } } }
			);
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}).catch(function (err) {
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		});
	}
}
exports.postNewProgramPost = async (req, res) => {
	let postData = req.body;
	console.log("====postData===",postData.user)
	const url_data = postData.post_url;
	const projectData = await ProgramModel.findOne({ _id: postData.program });

	if (typeof postData.post_url === 'undefined' || postData.post_url == '' && postData.postImageUrl != '') {

		var postCreated = [];
		if (postData.postImageUrl !== '' && postData.postImageUrl !== null && typeof postData.postImageUrl !== 'undefined') {
			var upObj = {
				postText: postData.postText,
				postComment: '',
				postData: postData.post_comment,
				postImageUrl: postData.postImageUrl,
				posturl: '',
				postBy: postData.user,
				postType: 'image',
				createdAt: Date.now(),
			};
			postCreated.push(upObj);
		}
		else {
			var upObj = {
				postText: postData.postText,
				postComment: '',
				postData: postData.post_comment,
				posturl: '',
				postBy: postData.user,
				postType: 'text',
				createdAt: Date.now(),
			};
			postCreated.push(upObj);
		}
		try {
			let result = await ProgramModel.findOneAndUpdate(
				{ _id: postData.program },
				{ $push: { "programPost": { $each: postCreated, $position: 0 } } }
			);
			
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}
		catch (error) {
			res.status(400).json({
				status: 'error',
				message: 'Post add faild',
			});
		}
	}
	else if (typeof postData.post_url !== 'undefined' && postData.post_url !== '' && postData.postImageUrl !== '' && postData.postImageUrl !== null) {
		var postCreated = [];
		var upObj = {
			postText: postData.postText,
			postComment: '',
			postData: postData.post_comment,
			postImageUrl: postData.postImageUrl,
			posturl: '',
			postBy: postData.user,
			postType: 'image',
			createdAt: Date.now(),
		};
		postCreated.push(upObj);
		try {
			let result = await ProgramModel.findOneAndUpdate(
				{ _id: postData.program },
				{ $push: { "programPost": { $each: postCreated, $position: 0 } } }
			);
			
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}
		catch (error) {
			res.status(400).json({
				status: 'error',
				message: 'Post add faild',
			});
		}
	}
	else {
		request(url_data).then(async function (html) {
			//success! 
			var $ = cheerio.load(html),
				title = $('head title').text(),
				$desc = $('meta[name="description"]').attr('content'),
				$ogTitle = $('meta[property="og:title"]').attr('content'),
				$ogImage = $('meta[property="og:image"]').attr('content'),
				$images = $('img');

			if ($ogTitle == '') {
				return res.status(400).json({
					status: 'error',
					message: 'Please add valid Post url',
				});
			}

			var postCreated = [];
			let upObj = {
				postText: postData.postText,
				postComment: postData.post_comment,
				postData: $ogTitle,
				postImageUrl: $ogImage,
				posturl: url_data,
				postBy: postData.user,
				postType: 'image',
				createdAt: Date.now(),
			};
			postCreated.push(upObj);

			let result = await ProgramModel.findOneAndUpdate(
				{ _id: postData.program },
				{ $push: { "programPost": { $each: postCreated, $position: 0 } } }
			);
			console.log("===result====",result)
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}).catch(function (err) {
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		});
	}
}
exports.programlist = async (req, res) => {
	
	let postData = req.params.id;
	let whereSloat = {program_id: req.params.id,status:1,user_id:req.user.id};
	
	try {
		let result =  await ProgramModel.findOne({ _id: postData });
		let projectDetail   = await ProgramModel.findById(new mongoose.Types.ObjectId(postData))
		let fetch_certificate = await UserPrograms.findOne(whereSloat);
	  
		
		res.status(200).json({
			status: 'Success',
			message: 'Post added Successfully',
			programDetails:projectDetail,
			certificateData: fetch_certificate,
		});
	}
	catch (error) {
		res.status(400).json({
			status: 'error',
			message: 'Post add faild',
		});
	}


	
}

exports.updateProgramPost = async (req, res) => {
	let postData = req.body;
	console.log("=======", postData)
	const url_data = postData.post_url;
	const projectData = await ProgramModel.findOne({ _id: postData.program });

	var postCreated = projectData.programPost;
	var postIndex = postData.postindex;

	if (typeof postData.post_url === 'undefined' || postData.post_url == '' && postData.postImageUrl != '') {

		if (postData.postImageUrl !== '' && postData.postImageUrl !== null && typeof postData.postImageUrl !== 'undefined') {
			postCreated[postIndex]['postText'] = postData.postText;
			postCreated[postIndex]['postData'] = postData.post_comment;
			postCreated[postIndex]['postImageUrl'] = postData.postImageUrl;
			postCreated[postIndex]['postBy'] = postData.user;
			postCreated[postIndex]['postType'] = 'image';
		}
		else {

			postCreated[postIndex]['postText'] = postData.postText;
			postCreated[postIndex]['postData'] = postData.post_comment;
			postCreated[postIndex]['postBy'] = postData.user;
			postCreated[postIndex]['postImageUrl'] = null;
			postCreated[postIndex]['postType'] = 'text';

		}
		try {
			let result = await ProgramModel.findOneAndUpdate(
				{ _id: postData.program },
				{ "programPost": postCreated }
			);
			res.status(200).json({
				status: 'Success',
				message: 'Post update Successfully',
			});
		}
		catch (error) {
			res.status(400).json({
				status: 'error',
				message: 'Post update faild',
			});
		}
	}
	else if (typeof postData.post_url !== 'undefined' && postData.post_url !== '' && postData.postImageUrl !== '' && postData.postImageUrl !== null) {

		postCreated[postIndex]['postText'] = postData.postText;
		postCreated[postIndex]['postData'] = postData.post_comment;
		postCreated[postIndex]['postImageUrl'] = postData.postImageUrl;
		postCreated[postIndex]['postBy'] = postData.user;
		postCreated[postIndex]['postType'] = 'image';

		try {
			let result = await ProgramModel.findOneAndUpdate(
				{ _id: postData.program },
				{ "programPost": postCreated }
				
			);
			
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}
		catch (error) {
			res.status(400).json({
				status: 'error',
				message: 'Post add faild',
			});
		}
	}
	else {
		request(url_data).then(async function (html) {
			//success! 
			var $ = cheerio.load(html),
				title = $('head title').text(),
				$desc = $('meta[name="description"]').attr('content'),
				$ogTitle = $('meta[property="og:title"]').attr('content'),
				$ogImage = $('meta[property="og:image"]').attr('content'),
				$images = $('img');

			if ($ogTitle == '') {
				return res.status(400).json({
					status: 'error',
					message: 'Please add valid Post url',
				});
			}

			postCreated[postIndex]['postText'] = postData.postText;
			postCreated[postIndex]['postComment'] = postData.post_comment;
			postCreated[postIndex]['postData'] = $ogTitle;
			postCreated[postIndex]['postImageUrl'] = $ogImage;
			postCreated[postIndex]['postBy'] = postData.user;
			postCreated[postIndex]['postType'] = 'image';

			let result = await ProgramModel.findOneAndUpdate(
				{ _id: postData.program },
				{ "programPost": postCreated }
				
			);
			
			res.status(200).json({
				status: 'Success',
				message: 'Post update Successfully',
			});
		}).catch(function (err) {
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		});
	}
}



exports.updateProjectPost = async (req, res) => {
	let postData = req.body;
	const url_data = postData.post_url;
	const projectData = await ProjectsModel.findOne({ _id: postData.project });

	var postCreated = projectData.projectPost;
	var postIndex = postData.postindex;

	if (typeof postData.post_url === 'undefined' || postData.post_url == '' && postData.postImageUrl != '') {

		if (postData.postImageUrl !== '' && postData.postImageUrl !== null && typeof postData.postImageUrl !== 'undefined') {
			postCreated[postIndex]['postText'] = postData.postText;
			postCreated[postIndex]['postData'] = postData.post_comment;
			postCreated[postIndex]['postImageUrl'] = postData.postImageUrl;
			postCreated[postIndex]['postBy'] = postData.user;
			postCreated[postIndex]['postType'] = 'image';
		}
		else {

			postCreated[postIndex]['postText'] = postData.postText;
			postCreated[postIndex]['postData'] = postData.post_comment;
			postCreated[postIndex]['postBy'] = postData.user;
			postCreated[postIndex]['postImageUrl'] = null;
			postCreated[postIndex]['postType'] = 'text';

		}
		try {
			let result = await ProjectsModel.findOneAndUpdate(
				{ _id: postData.project },
				{ "projectPost": postCreated }
			);
			res.status(200).json({
				status: 'Success',
				message: 'Post update Successfully',
			});
		}
		catch (error) {
			res.status(400).json({
				status: 'error',
				message: 'Post update faild',
			});
		}
	}
	else if (typeof postData.post_url !== 'undefined' && postData.post_url !== '' && postData.postImageUrl !== '' && postData.postImageUrl !== null) {

		postCreated[postIndex]['postText'] = postData.postText;
		postCreated[postIndex]['postData'] = postData.post_comment;
		postCreated[postIndex]['postImageUrl'] = postData.postImageUrl;
		postCreated[postIndex]['postBy'] = postData.user;
		postCreated[postIndex]['postType'] = 'image';

		try {
			let result = await ProjectsModel.findOneAndUpdate(
				{ _id: postData.project },
				{ "projectPost": postCreated }
			);
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}
		catch (error) {
			res.status(400).json({
				status: 'error',
				message: 'Post add faild',
			});
		}
	}
	else {
		request(url_data).then(async function (html) {
			//success! 
			var $ = cheerio.load(html),
				title = $('head title').text(),
				$desc = $('meta[name="description"]').attr('content'),
				$ogTitle = $('meta[property="og:title"]').attr('content'),
				$ogImage = $('meta[property="og:image"]').attr('content'),
				$images = $('img');

			if ($ogTitle == '') {
				return res.status(400).json({
					status: 'error',
					message: 'Please add valid Post url',
				});
			}

			postCreated[postIndex]['postText'] = postData.postText;
			postCreated[postIndex]['postComment'] = postData.post_comment;
			postCreated[postIndex]['postData'] = $ogTitle;
			postCreated[postIndex]['postImageUrl'] = $ogImage;
			postCreated[postIndex]['postBy'] = postData.user;
			postCreated[postIndex]['postType'] = 'image';

			let result = await ProjectsModel.findOneAndUpdate(
				{ _id: postData.project },
				{ "projectPost": postCreated }
			);
			res.status(200).json({
				status: 'Success',
				message: 'Post update Successfully',
			});
		}).catch(function (err) {
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		});
	}
}


exports.addNewProjectPostLike = async (req, res) => {
	let postData = req.body;
	var postindex = postData.post_index;
	const projectData = await ProjectsModel.findOne({ _id: postData.project });
	if (postData.like_action == 'addlike' && postData.user != null) {
		projectData.projectPost[postindex].postLike.push(postData.user);
		let result = await ProjectsModel.findOneAndUpdate(
			{ _id: postData.project },
			projectData
		);
		res.status(200).json({
			status: 'Success',
			message: 'Post like Successfully',
		});
	}
	else if (postData.like_action == 'removelike') {
		var index_like = projectData.projectPost[postindex].postLike.indexOf(postData.user);
		if (index_like !== -1) {
			projectData.projectPost[postindex].postLike.splice(index_like, 1);
		}
		let result = await ProjectsModel.findOneAndUpdate(
			{ _id: postData.project },
			projectData
		);

		res.status(200).json({
			status: 'Success',
			message: 'Post like removed Successfully',
		});
	}
	else {
		res.status(400).json({
			status: 'error',
			message: 'Post like faild',
		});
	}
}

exports.RemoveProjectEvent = async (req, res) => {
	let postData = req.body;
	//console.log("=========",postData)
	var postindex = postData.post_index;
	var userindex = postData.user_index;
	const projectData = await ProjectsModel.findOne({ _id: postData.project });

	if (postData.event_action == 'remove' && postData.user != null && userindex == '') {
		//	console.log("ggggggggggggggggggg")
		projectData.projectEvent.splice(postindex, 1);
		let result = await ProjectsModel.findOneAndUpdate(
			{ _id: postData.project },
			projectData
		);
		res.status(200).json({
			status: 'Success',
			message: 'Event remove successfully',
		});
	}
	else if (postData.event_action == 'remove_user' && userindex != null) {
		projectData.projectEvent[postindex].eventGuest.splice(userindex, 1);
		let result = await ProjectsModel.findOneAndUpdate(
			{ _id: postData.project },
			projectData
		);
		res.status(200).json({
			status: 'Success',
			message: 'Event user remove successfully',
		});
	}
	else {
		res.status(400).json({
			status: 'error',
			message: 'Event remove faild',
		});
	}
}
exports.RemoveProgramEvent = async (req, res) => {
	let postData = req.body;
	//console.log("=========",postData)
	var postindex = postData.post_index;
	var userindex = postData.user_index;
	const projectData = await ProgramModel.findOne({ _id: postData.program });

	if (postData.event_action == 'remove' && postData.user != null && userindex == '') {
		//	console.log("ggggggggggggggggggg")
		projectData.programEvent.splice(postindex, 1);
		let result = await ProgramModel.findOneAndUpdate(
			{ _id: postData.program },
			projectData
		);
		res.status(200).json({
			status: 'Success',
			message: 'Event remove successfully',
		});
	}
	else if (postData.event_action == 'remove_user' && userindex != null) {
		projectData.programEvent[postindex].eventGuest.splice(userindex, 1);
		let result = await ProgramModel.findOneAndUpdate(
			{ _id: postData.program },
			projectData
		);
		res.status(200).json({
			status: 'Success',
			message: 'Event user remove successfully',
		});
	}
	else {
		res.status(400).json({
			status: 'error',
			message: 'Event remove faild',
		});
	}
}


exports.postNewProjectEvent = async (req, res) => {
	let postData = req.body;
	//console.log("===========",postData)
	const projectData = await ProjectsModel.findOne({ _id: postData.project });
	// if(postData.startDate == '')
	// {
	// 	return res.status(400).json({
	// 		status: 'error',
	// 		message: 'Please add valid Post url',
	// 	});
	// }

	var eventCreated = [];
	let upObj = {
		eventName: postData.eventName,
		timezone: postData.timezone,
		startDate: postData.startDate,
		startTime: postData.startTime,
		endDate: postData.endDate,
		endTime: postData.endTime,
		event_schedule: postData.event_schedule,
		eventGuest: postData.add_guest,
		eventBy: postData.user,
		createdAt: Date.now(),
	};
	eventCreated.push(upObj);
	try {
		let result = await ProjectsModel.findOneAndUpdate(
			{ _id: postData.project },
			{ $push: { "projectEvent": { $each: eventCreated, $position: 0 } } }
		);
		res.status(200).json({
			status: 'Success',
			message: 'Add event Successfully',
		});
	}
	catch (error) {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'event add faild',
		});
	}
}

exports.postNewProgramEvent = async (req, res) => {
	let postData = req.body;
	//console.log("===========",postData)
	const projectData = await ProgramModel.findOne({ _id: postData.program });
	// if(postData.startDate == '')
	// {
	// 	return res.status(400).json({
	// 		status: 'error',
	// 		message: 'Please add valid Post url',
	// 	});
	// }

	var eventCreated = [];
	let upObj = {
		eventName: postData.eventName,
		timezone: postData.timezone,
		startDate: postData.startDate,
		startTime: postData.startTime,
		endDate: postData.endDate,
		endTime: postData.endTime,
		event_schedule: postData.event_schedule,
		eventGuest: postData.add_guest,
		eventBy: postData.user,
		createdAt: Date.now(),
	};
	eventCreated.push(upObj);
	try {
		let result = await ProgramModel.findOneAndUpdate(
			{ _id: postData.program },
			{ $push: { "programEvent": { $each: eventCreated, $position: 0 } } }
		);
		res.status(200).json({
			status: 'Success',
			message: 'Add event Successfully',
		});
	}
	catch (error) {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'event add faild',
		});
	}
}

exports.EditNewProjectEvent = async (req, res) => {
	let postData = req.body;
	const query = { _id: ObjectId(postData.project), "projectEvent._id": postData._id };
	const updateDocument = {
		$set: {
			"projectEvent.$.eventName": postData.eventName,
			"projectEvent.$.timezone": postData.timezone,
			"projectEvent.$.startDate": postData.startDate,
			"projectEvent.$.startTime": postData.startTime,
			"projectEvent.$.endDate": postData.endDate,
			"projectEvent.$.endTime": postData.endTime,
			"projectEvent.$.event_schedule": postData.event_schedule,
			"projectEvent.$.eventBy": postData.eventBy,
			"projectEvent.$.eventGuest": postData.eventGuest





		},
		// "$push": { "projectEvent.$.eventGuest": postData.eventGuest }
	};
	console.log("======>", updateDocument);
	try {
		const result = await ProjectsModel.update(query, updateDocument);
		const projectData = await ProjectsModel.findOne({ _id: postData.project });
		res.status(200).json({
			status: 'Success',
			message: 'Event Update Successfully',
		});
	}
	catch (error) {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'event update failed',
		});
	}

}
exports.EditNewProgramEvent = async (req, res) => {
	let postData = req.body;
	const query = { _id: ObjectId(postData.program), "programEvent._id": postData._id };
	const updateDocument = {
		$set: {
			"programEvent.$.eventName": postData.eventName,
			"programEvent.$.timezone": postData.timezone,
			"programEvent.$.startDate": postData.startDate,
			"programEvent.$.startTime": postData.startTime,
			"programEvent.$.endDate": postData.endDate,
			"programEvent.$.endTime": postData.endTime,
			"programEvent.$.event_schedule": postData.event_schedule,
			"programEvent.$.eventBy": postData.eventBy,
			"programEvent.$.eventGuest": postData.eventGuest
		},
		// "$push": { "projectEvent.$.eventGuest": postData.eventGuest }
	};
	console.log("======>", updateDocument);
	try {
		const result = await ProgramModel.findOneAndUpdate(query, updateDocument);
		const projectData = await ProgramModel.findOne({ _id: postData.program });
		res.status(200).json({
			status: 'Success',
			message: 'Event Update Successfully',
		});
	}
	catch (error) {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'event update failed',
		});
	}

}

exports.UserProgramSuccess = async (req, res) => {
	let postData = req.body;
	const programlins = new userProgramModel({
		program_id: postData.programId,
		user_id: postData.user_id,
		status: 1,
		paymentType:postData.paymentType,
		paymentAmount:postData.paymentAmount,
		programStatus:"InProgress"
	});
	const userData = await userModel.findOne({ _id: postData.user_id });
	try {
		const programData   = await programlins.save();
		let updateProjectMember = await ProgramModel.findOneAndUpdate(
			{ _id: postData.programId },
			{ $push: { "programMembers": postData.user_id, $position: 0 } }
		);
		res.status(200).json({
			status: 'Success',
			message: 'Program joined successfully.',
		});
	}
	catch (error) {
		console.log(error);
		//next(error);
		res.status(400).json({
			status: 'error',
			message: 'payment faild',
		});
	}
}

exports.UserProjectSuccess = async (req, res) => {
	let postData = req.body;

	// Check User Already Payment

	let checkUserPayable = await userProjectModel.findOne({
		project_id: postData.project_id,
		user_id: postData.user_id
	});

	if(checkUserPayable)
	{
		return res.status(400).json({
			status: 'error',
			message: 'You have already join this project',
		});
	}

	const Fetch_projectData = await ProjectsModel.findOne({ _id: postData.project_id });
	const projectlins = new userProjectModel({
		project_id: postData.project_id,
		user_id: postData.user_id,
		status: 1,
		paymentType:postData.paymentType,
		paymentAmount: Fetch_projectData.projectPrice.amount
	});
	const userData = await userModel.findOne({ _id: postData.user_id });
	
	try {
		if (userData.type == 'student') {
			if(postData.rewardjoin == true)
			{
				var rewardDebit = new RewardsPoint({
					active: true,
					user_id: postData.user_id,
					rewardName: "Project Join :"+" "+Fetch_projectData.title,
					rewardDebitPoint: "1000",
					uniqueId: postData.project_id,
				});
				await rewardDebit.save();
			}
			let rewardData = new RewardsPoint({
				active: true,
				user_id: postData.user_id,
				rewardName: "Project Join :"+" "+Fetch_projectData.title,
				rewardCreditPoint: "200",
				uniqueId: postData.project_id,
			});
			const ins_rewardData = await rewardData.save();
		}

		const projectData = await projectlins.save();
		var projectPaymentPush = [];
		let paymentObj;
		if (Fetch_projectData.projectfees == 1) {
			paymentObj = {
				userBy: postData.user_id,
				projectFess: Fetch_projectData.projectPrice.amount,
				createdAt: Date.now(),
			};
		}
		else {
			paymentObj = {
				userBy: postData.user_id,
				projectFess: 'Free',
				createdAt: Date.now(),
			};
		}

		projectPaymentPush.push(paymentObj);

		let updatePaymentUser = await ProjectsModel.findOneAndUpdate(
			{ _id: postData.project_id },
			{ $push: { "projectPaymentUser": { $each: projectPaymentPush, $position: 0 } } }
		);

		let updateProjectMember = await ProjectsModel.findOneAndUpdate(
			{ _id: postData.project_id },
			{ $push: { "projectMembers": postData.user_id, $position: 0 } }
		);

		let updateProjectStatus = await ProjectsModel.findOneAndUpdate(
			{ _id: postData.project_id },
			{ "projectStatus": "ongoing"}
		);

		let mobExtension;
		if(typeof userData.student_profile.ways_to_be_in_touch !== 'undefined') 
		{
			if (typeof userData.student_profile.ways_to_be_in_touch.phone_number.extension !== 'undefined') {
				mobExtension = userData.student_profile.ways_to_be_in_touch.phone_number.extension;
			}
			else {
				mobExtension = '';
			}
		}

		let mobNumber;
		if(typeof userData.student_profile.ways_to_be_in_touch !== 'undefined') 
		{
			if (typeof userData.student_profile.ways_to_be_in_touch.phone_number.number !== 'undefined') {
				mobNumber = userData.student_profile.ways_to_be_in_touch.phone_number.number;
			}
			else {
				mobNumber = '';
			}
		}
		let project_mailObj = {
			project_name: Fetch_projectData.title,
			project_price: Fetch_projectData.projectPrice.amount,
			projectpaymentId: Fetch_projectData.projectpaymentId,
			email: userData.email,
			name: userData.name + userData.last_name,
			mobile: mobExtension + ' ' + mobNumber,
		};

		let freeproject_mailObj = {
			project_name: Fetch_projectData.title,
			email: userData.email,
			name: userData.name + userData.last_name,
		}

		if (Fetch_projectData.projectpaymentId != null && Fetch_projectData.projectpaymentStatus == 'paid') {
			sendEmail(emailType.SEND_PROJECT_INVOICE, project_mailObj);
		}

		sendEmail(emailType.FREE_PROJECT_JOING, freeproject_mailObj);
		if (Fetch_projectData.projectfees == 1) {
			res.status(200).json({
				status: 'Success',
				message: 'Thank you for the payment of Project.',
			});
		} else {
			res.status(200).json({
				status: 'Success',
				message: 'Members joined successfully.',
			});
		}
	}
	catch (error) {
		console.log(error);
		//next(error);
		res.status(400).json({
			status: 'error',
			message: 'payment faild',
		});
	}
}

exports.updateProjectPaymentStatus = async (req, res) => {
	let postData = req.body;
	try {
		let result = await ProjectsModel.findOneAndUpdate(
			{ _id: postData.project_id, projectpaymentStatus: 'unpaid', "projectpaymentId": { $ne: null } },
			{ projectpaymentStatus: 'paid' }
		);
		res.status(200).json({
			status: 'Success',
			message: 'Update Project Successfully',
			data: result,
		});
	}
	catch (error) {
		//console.log(error);
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Update Project faild',
		});
	}
}

exports.postProjectFiles = async (req, res, next) => {
	if (req.file && req.file.key) {

		let postData = req.body;
		let fileName = postData.file_name.split('.').slice(0, -1).join('.');
		req.body.fileUrl = req.file.location;
		req.body.owner = req.body.user_id;
		let userData = await userModel.findOne({ _id: postData.user_id });

		let projectFile = await projectDashboardPostServices.postProjectFile(Object.assign({
			project: req.params.id,
			user: req.user._id,
			avatar: userData.avatar,
			name: userData.name,
			last_name: userData.last_name,
			file_type: postData.type,
			file_name: fileName,
			createdAt: Date.now(),
		}, { file: req.body.fileUrl }));

		if (projectFile) {
			res.status(200).json({
				status: 'success',
				message: 'File Added',
				data: {
					projectFile
				},
			});
		}
	} else {
		res.status(400).json({
			status: 'error',
			problem: 'file missing',
		});
	}
}

exports.postProgrmFiles = async (req, res, next) => {
	if (req.file && req.file.key) {

		let postData = req.body;
		let fileName = postData.file_name.split('.').slice(0, -1).join('.');
		req.body.fileUrl = req.file.location;
		req.body.owner = req.body.user_id;
		let userData = await userModel.findOne({ _id: postData.user_id });

		let programFile = await projectDashboardPostServices.postProgramFile(Object.assign({
			program: req.params.id,
			user: req.user._id,
			avatar: userData.avatar,
			name: userData.name,
			last_name: userData.last_name,
			file_type: postData.type,
			file_name: fileName,
			createdAt: Date.now(),
		}, { file: req.body.fileUrl }));

		if (programFile) {
			res.status(200).json({
				status: 'success',
				message: 'File Added',
				data: {
					programFile
				},
			});
		}
	} else {
		res.status(400).json({
			status: 'error',
			problem: 'file missing',
		});
	}
}


exports.postProjectChat = async (req, res, next) => {
	try {
		let projectChat = await projectDashboardPostServices.postProjectChat(req.body);
		//console.log("Posting Chat",projectChat,req.body)
		if (projectChat) {
			res.status(200).json({
				status: 'success',
				message: 'Chat Created',
				data: {
					projectChat
				},
			});
		}
	} catch (error) {
		next(error);
	}
}
exports.postProgramChat = async (req, res, next) => {
	try {
		let projectChat = await projectDashboardPostServices.postProgramChat(req.body);
		//console.log("Posting Chat",projectChat,req.body)
		if (projectChat) {
			res.status(200).json({
				status: 'success',
				message: 'Chat Created',
				data: {
					projectChat
				},
			});
		}
	} catch (error) {
		next(error);
	}
}


exports.postProjectChatFile = async (req, res, next) => {
	if (req.file && req.file.key) {
		// respose of file name and url
		// res.status(200).json({
		// 	status: 'success',
		// 	owner: req.user._id,
		// 	fileUrl: req.file.location,
		// });

		//  file url and user id to request body
		req.body.fileUrl = req.file.location;
		req.body.owner = req.user._id;

		let chatData = Object.assign({
			project: req.params.id,
			user: req.user._id
		}, { file: req.body.fileUrl });
		let chatFile = await projectDashboardPostServices.postProjectFile(chatData);
		let data = await projectDashboardPostServices.postProjectChat(chatData);
		if (data) {
			res.status(200).json({
				status: 'success',
				message: 'Chat Created',
				data: {
					projectChat: data
				},
			});
		}
	} else {
		res.status(400).json({
			status: 'error',
			problem: 'file missing',
		});
	}
}

exports.getProjectFeeds = async (req, res, next) => {
	try {
		let projectId = req.params.id;
		let projectFeeds = await projectDashboardGetServices.getProjectFeeds(projectId);
		if (projectFeeds) {
			res.status(200).json({
				status: 'success',
				message: 'Dashboard info',
				data: {
					projectFeeds
				},
			});
		}
	} catch (error) {
		next(error);
	}
}