import UserProjects from '../models/userProjects';
import UserProjectsWatchlist from '../models//userProjectWatchlist';
import { getQueryParams } from '../utilities/helpers';
import { statusTypes } from '../utilities/constant_variables';
import mongoose from 'mongoose';

exports.userProjectPostServices = {
	async saveRequest(requestData) {
		try {
			requestData.status = statusTypes.ACTIVE;
			const projects = await UserProjects.findOneAndUpdate(
				{ project_id: requestData.project_id, user_id: requestData.user_id },
				requestData,
				{ new: true, upsert: true }
			);
			if (projects) {
				const populateQuery = [
					{
						path: 'project',
						select: '-_id title description partner',
						populate: { path: 'partner', select: '-_id name avatar' },
					},
				];
				return await UserProjects.find(
					{
						project_id: requestData.project_id,
						user_id: requestData.user_id,
						status: statusTypes.ACTIVE,
					},
					'project_id',
					{ populate: populateQuery }
				);
			}
		} catch (e) {
			throw e;
		}
	},
	async removeUserFromProject(requestData) {
		try {
			return await UserProjects.updateOne(
				{ project_id: requestData.project_id, user_id: requestData.user_id },
				{ status: statusTypes.DELETED }
			);
		} catch (e) {
			throw e;
		}
	},
	async saveWatchlistRequest(requestData) {
		try {
			requestData.project_id = new mongoose.Types.ObjectId(requestData.project_id);
			requestData.user_id = new mongoose.Types.ObjectId(requestData.user_id);
			const projects = await UserProjectsWatchlist.findOneAndUpdate(
				{ project_id: requestData.project_id, user_id: requestData.user_id },
				requestData,
				{ new: true, upsert: true }
			);
			if (projects) {
				const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
				return await UserProjectsWatchlist.find(
					{ user_id: requestData.user_id },
					'project_id',
					{ populate: populateQuery }
				);
			}
		} catch (e) {
			throw e;
		}
	},
	async removeUserWatchlist(requestData) {
		try {
			return await UserProjectsWatchlist.findOneAndDelete({
				project_id: requestData.project_id,
				user_id: requestData.user_id,
			});
		} catch (e) {
			throw e;
		}
	},
};

exports.userProjectGetServices = {
	async getAll(query) {
		const params = getQueryParams(query);
		const populateQuery = [
			{ path: 'project', select: '-_id title' },
			{ path: 'student', select: '-_id name' },
		];
		return await UserProjects.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			populate: populateQuery,
		});
	},

	async getStudentsByProject(project_id) {
		const populateQuery = [
			{ path: 'student', select: '-_id name last_name qualification phone_number' },
		];
		return await UserProjects.find(
			{ project_id: project_id, status: statusTypes.ACTIVE },
			'user_id',
			{ populate: populateQuery }
		);
	},

	async getProjectsByUser(user_id) {
		const populateQuery = [{ path: 'project', select: '-_id title description' }];
		return await UserProjects.find(
			{ user_id: user_id, status: statusTypes.ACTIVE },
			'project_id',
			{ populate: populateQuery }
		);
	},

	async getProjectsByStudent(user_id, watchlistProjects) {
		// var populateQuery =  [{path:'project', select:'-_id title description sdg partner',populate: { path: 'partner',select:'-_id name avatar' }}];
		const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
		let projects = await UserProjects.find(
			{ user_id: user_id, status: statusTypes.ACTIVE },
			'project_id',
			{ populate: populateQuery }
		);
		const docs = projects;
		const updatedDocs = docs.map(function (obj) {
			obj = obj.toJSON();
			// obj.signedup = signedUpProjects.includes(obj.id);
			obj.watchlist = watchlistProjects.includes(obj.id);
			// obj.completed = completedProjects.includes(obj.id)
			return obj;
		});
		projects = updatedDocs;
		return projects;
	},

	async getCompletedProjectsByStudent(user_id, watchlistProjects) {
		// var populateQuery =  [{path:'project', select:'-_id title description sdg partner',populate: { path: 'partner',select:'-_id name avatar' }}];
		const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
		let projects = await UserProjects.find(
			{ user_id: user_id, status: statusTypes.INACTIVE },
			'project_id',
			{ populate: populateQuery }
		);
		const docs = projects;
		const updatedDocs = docs.map(function (obj) {
			obj = obj.toJSON();
			// obj.signedup = signedUpProjects.includes(obj.id);
			obj.watchlist = watchlistProjects.includes(obj.id);
			// obj.completed = completedProjects.includes(obj.id)
			return obj;
		});
		projects = updatedDocs;
		return projects;
	},

	async getProjectsWatchlistByStudent(user_id) {
		// const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
		// const populateQuery2 = [{ path: 'user_projects', populate: { path: 'partner' } }];
		// const projects = await UserProjectsWatchlist.find(
		// 	{ user_id: new mongoose.Types.ObjectId(user_id) },
		// 	'project_id user_id'
		// 			).populate(populateQuery);
		let where = { user_id: new mongoose.Types.ObjectId(user_id) }
		let Allaggregate = [
			{
				$match: where,
			},
			{
				$lookup: {
					from: 'projects',
					localField: 'project_id',
					foreignField: '_id',
					as: 'project'
				}
			},
			{ $unwind: '$project' },
			{
				$lookup: {
					from: 'user_projects',
					localField: 'project_id',
					foreignField: 'project_id',
					as: 'projectSlot'
				}
			},
			{ $addFields: { projectAvailableSlot: { $size: "$projectSlot" } } },
			{
				$project: {
					_id: 1,
					project_id: 1,
					user_id: 1,
					project: "$project",
					projectAvailableSlot: 1
				},
			},
		];

		var projects = await UserProjectsWatchlist.aggregate(
			Allaggregate
		);
		//console.log(projects);
		return projects;
	},


};
