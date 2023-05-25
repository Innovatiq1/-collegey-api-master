/* eslint-disable node/no-unsupported-features/es-syntax */
import User from '../models/User';
import Projects from '../models/Projects';
import blogModel from '../models/Blogs';
import { statusTypes, registrationType } from '../utilities/constant_variables';
import { userPostServices } from '../services/userServices';
import { emailType, sendEmail } from '../utilities/emailHelper';

const uploadFiles = async function uploadFiles(req, res) {
	const { files } = req;
	let filesObj = [];
	if (req.body.type === 'single') {
		filesObj = files[0].key;
	} else {
		filesObj = files.map(function(file) {
			return file.key;
		});
	}
	return res.json({
		files: filesObj,
	});
};

export { uploadFiles };

const uploadAllBannerFiles = async function uploadAllBannerFiles(req, res) {
	let postData = req.body;
	const { files } = req;
	var filesObj 	= [];
	for (let i = 0; i < files.length; i++) {
		let upObj = {
			image: files[i].location,
			active: false,
		}
		filesObj.push(upObj);
	}
	try{ 
       	let result = await User.findOneAndUpdate(
			{_id: postData.userid},
			{ $push: { "AllbannerImage":{$each: filesObj,$position:0} } }
		); 
		return res.json({
			status: 'success',
			message: 'Banner image added & Updated successfully',
			data: filesObj
		});
    } catch (error) { 
	
		res.status(400).json({
			status: 'faild',
			message: 'Banner image add faild',
		});
    }
};

export { uploadAllBannerFiles };

const impactPartnersList = async function impactPartner(req, res) {
	const impact_partner = await User.find({
		status: statusTypes.ACTIVE,
		type: registrationType.PARTNER,
		user_type: 11,
	}).select('id name');
	res.status(200).json({
		status: 'success',
		message: 'impact partners list',
		data: impact_partner,
	});
};

export { impactPartnersList };

const studentList = async function(req, res) {
	const student_list = await User.find({
		status: statusTypes.ACTIVE,
		type: registrationType.STUDENT,
	}).select('id name');
	res.status(200).json({
		status: 'success',
		message: 'Student list',
		data: student_list,
	});
};

export { studentList };

const projectList = async function(req, res) {
	const project_list = await Projects.find({ status: statusTypes.ACTIVE }).select('id title');
	res.status(200).json({
		status: 'success',
		message: 'Project List',
		data: project_list,
	});
};

export { projectList };

const forgotPassword = async function(req, res, next) {
	try {
		const user = await userPostServices.forgotPassword(req.body.email);
		res.status(200).json({
			status: 'success',
			message: 'Password reset link sent | Please check your mail for further instructions',
			token: '',
		});
	} catch (e) {
		next(e);
	}
};
export { forgotPassword };

const checkResetPassword = async function(req, res, next) {
	try {
		const user = await User.findOne({
			reset_password_token: req.params.token,
			reset_password_expires: { $gt: Date.now() },
		});
		if (user) {
			res.status(200).json({
				status: 'success',
				message: 'user info',
				data: user,
			});
		} else {
			res.status(400).json({
				status: 'error',
				message: 'token expired, Please try again.',
			});
		}
	} catch (e) {
		next(e);
	}
};
export { checkResetPassword };

const resetPassword = async function(req, res, next) {
	try {
		await userPostServices.resetPassword(req.body, req.params.token);
		res.status(200).json({
			status: 'success',
			message: 'password updated sucessfully',
		});
	} catch (e) {
		next(e);
	}
};
export { resetPassword };

exports.commentUsers = async (req, res, next) => {
	let aggreagte = [
		{
			$project: {
				name: 1,
				 _id:1
			},
		},
	]

	var allUsers = await User.aggregate(
		aggreagte
	);

	res.status(200).json({
		status: 'success',
		message: 'User List',
		data: allUsers,
	});

}

const userListComments = async function(req,res,next) {
	let users = await User.find({}).select('_id name last_name email');
    res.status(200).json({
		status: 'success',
		message: 'User List',
		data: users,
	});
}

export { userListComments };