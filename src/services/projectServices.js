import Projects from '../models/Projects';
import { getQueryParams } from '../utilities/helpers';
import userProjectModel from '../models/userProjects';

exports.projectPostServices = {
	async saveRequest(requestData) {
		try {
			requestData['status'] = 1;
			return await Projects.create(requestData);
		} catch (e) {
			throw e;
		}
	},

	async updateProject(requestData, projectId) {
		try {
			if (projectId) {
				let projectResult = await Projects.findOne({_id: projectId});
				if(requestData.mentor != projectResult?.projectOwner?.id && projectResult.requestMentor != true)
				{
					requestData['acceptMentorInvitation'] = true;
					requestData['requestMentor'] = requestData.mentor;

					const projectlins = new userProjectModel({
						project_id: projectId,
						user_id: requestData.mentor,
						status: 1,
					});
					await projectlins.save();
				} 
				return await Projects.findOneAndUpdate({ _id: projectId }, requestData, {
					new: true,
				});
			} else {
				_throwException('project not found');
			}
		} catch (e) {
			throw e;
		}
	},

	async deleteProject(projectId) {
		try {
			if (projectId) {
				await Projects.updateOne({ _id: projectId }, { status: 10 });
				return true;
			} else {
				_throwException('project not found');
			}
		} catch (e) {
			throw e;
		}
	},
};

exports.projectGetServices = {

	async getAll(query, status = null) {
		const params = getQueryParams(query, status);
		console.log("params===>", params)
		return await Projects.paginate(params.filter, { page: params.page, limit: params.limit, sort: { createdAt: -1 }, });
	},

	async getAllStudentProject(query, status = null) {
		const params = getQueryParams(query, status);
		return await Projects.paginate({ $or: [{ projectStatus: 'new' }, { projectStatus: 'reject' }], projectType: { $not: { $in: ["mentors"] } } }, { page: params.page, limit: params.limit, sort: params.sortBy });
	},

	async getMentorProjectWise(query, status = null) {
		const params = getQueryParams(query, status);
		// return await Projects.find({projectType: { $in: ["mentors"] },$or: [ { projectStatus: 'new' },{ projectStatus: 'reject' } ]}).sort({_id: -1 }); 
		return await Projects.paginate({ $or: [{ projectStatus: 'new' }, { projectStatus: 'reject' }], projectType: { $in: "mentors" } }, { page: params.page, limit: params.limit, sort: params.sortBy });

	},

	async getProjectsListing(query, status = null) {
		const params = getQueryParams(query, status);
		const selectQuery = 'sdg title description partner hash_tags';
		const populateQuery = [{ path: 'partner', select: '-_id name avatar' }, { path: 'mentor' }];
		return await Projects.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			select: selectQuery,
			populate: populateQuery,
		});
	},

	async getSignupWiseProjectsListing(
		query,
		signedUpProjects,
		watchlistProjects,
		completedProjects
	) {
		const params = getQueryParams(query, true);
		const selectQuery = 'sdg title description partner hash_tags';
		// const populateQuery =  [{ path: 'partner',select:'-_id name avatar' }];
		const populateQuery = [{ path: 'partner' }, { path: 'mentor' }];
		let projects = await Projects.paginate(params.filter, {
			page: params.page,
			limit: 50,
			populate: populateQuery,
		});
		let docs = projects.docs;
		let updatedDocs = docs.map(function (obj) {
			obj = obj.toJSON();
			obj.signedup = signedUpProjects.includes(obj.id);
			obj.watchlist = watchlistProjects.includes(obj.id);
			obj.completed = completedProjects.includes(obj.id);
			return obj;
		});
		projects.docs = updatedDocs;
		return projects;
	},

	async getOne(projectId) {
		return await Projects.findOne({ _id: projectId });
	},

	async getProjectDetails(projectId) {
		const populateQuery = [{ path: 'partner', select: '-_id name avatar' }, { path: 'mentor' }];
		return await Projects.findOne({ _id: projectId }).populate('partner', 'name avatar');
	},

	async getMentorProjectList(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			$or: [{ projectOwner: mentorId }, { mentor: mentorId }]
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getMentorProjectInProgress(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			$or: [{ projectOwner: mentorId }, { mentor: mentorId }],
			projectStatus: 'ongoing'
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getMentorProjectCompleted(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			$or: [{ projectOwner: mentorId }, { mentor: mentorId }],
			projectStatus: 'completed'
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getMentorProjectLive(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			$or: [{ projectOwner: mentorId }, { mentor: mentorId }],
			projectStatus: 'pending'
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getMentorProjectPending(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			$or: [{ projectOwner: mentorId }, { mentor: mentorId }],
			projectStatus: 'new'
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getProjectsByMentorId(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			projectOwner: mentorId
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getAllMentorProject() {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			projectType: 'mentor'
		}).populate(populateQuery).sort({ "createdAt": -1 })
	}
};
