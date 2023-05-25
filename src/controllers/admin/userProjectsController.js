/* eslint-disable node/no-unsupported-features/es-syntax */
import {
	userProjectPostServices,
	userProjectGetServices,
} from '../../services/userProjectServices';

import UserProjects from '../../models/userProjects';
import ProjectsModel from '../../models/Projects';

export async function mapUserProject(req, res, next) {
	try {
		const userProject = await userProjectPostServices.saveRequest(req.body);
		res.status(200).json({
			status: 'success',
			message: 'Student added in project successfully',
			data: userProject,
		});
	} catch (e) {
		next(e);
	}
}

export async function mappedProjects(req, res, next) {
	try {
		const userProject = await userProjectGetServices.getAll(req.query);
		res.status(200).json({
			status: 'success',
			message: 'Mapped Project List',
			data: userProject,
		});
	} catch (e) {
		next(e);
	}
}

export async function removeUser(req, res, next) {
	try {
		const userProjects = await userProjectPostServices.removeUserFromProject(req.body);
		res.status(200).json({
			status: 'success',
			message: 'Student removed from Project',
		});
	} catch (e) {
		next(e);
	}
}

export async function studentsByProject(req, res, next) {
	try {
		const projectStudents = await userProjectGetServices.getStudentsByProject(
			req.params.project_id
		);
		res.status(200).json({
			status: 'success',
			message: 'Students in Project',
			data: projectStudents,
		});
	} catch (e) {
		next(e);
	}
}

export async function projectsByUser(req, res, next) {
	try {
		const userProjects = await userProjectGetServices.getProjectsByUser(req.params.user_id);
		res.status(200).json({
			status: 'success',
			message: 'Projects of student',
			data: userProjects,
		});
	} catch (e) {
		next(e);
	}
}
export async function addToWatchlist(req, res, next) {
	try {
		const watchlist = await userProjectPostServices.saveWatchlistRequest(req.body);
		res.status(200).json({
			status: 'success',
			message: 'Project added to watchlist',
			data: watchlist,
		});
	} catch (e) {
		next(e);
	}
}
export async function removeFromWatchlist(req, res, next) {
	try {
		const watchlist = await userProjectPostServices.removeUserWatchlist(req.body);
		res.status(200).json({
			status: 'success',
			message: 'Project remove from watchlist',
			data: watchlist,
		});
	} catch (e) {
		next(e);
	}
}

exports.CheckProjectAvilableSloat = async function(req, res, next) {
	let postData = req.body;
	let where    = {project_id: postData.project_id,status:1};
	let whereSloat = {project_id: postData.project_id,status:1,user_id:postData.userId};
	try
    {    
     	 let count_project = await UserProjects.find(where).count();
		 let fetch_data    = await UserProjects.find(where);
		 let projectReview = await ProjectsModel.findOne({_id: postData.project_id});
		 let fetch_certificate = await UserProjects.findOne(whereSloat);

		 res.status(200).json({  
            status: "success",
            message: "Student Project Sloat successfully",
            data: count_project,
			result: fetch_data,  
			certificateData: fetch_certificate,
			projectreview: projectReview.projectReview,
	    });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Student Project Sloat fetch faild',
		});
    } 
};
