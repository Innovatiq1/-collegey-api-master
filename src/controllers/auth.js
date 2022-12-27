/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable eqeqeq */
let request = require("request");
import passport from 'passport'; 
import { redisClient } from '../middleware/redisClient';
import { userPostServices, userGetServices } from '../services/userServices';
import { getFields } from '../utilities/helpers';
import { emailType, sendEmail } from '../utilities/emailHelper';
import User from '../models/User';
const { getToken } = require('../utilities/helpers');

exports.signup = async function(req, res, next) {
	// console.log(req.body);
	passport.authenticate('register', (err, user, info) => {
		if (err) {
			return res.status(500).send({ status: 'error', message: err.message });
		}
		if (info != undefined) {
			return res.status(400).send({ status: 'error', message: info.message });
		}
		let user_data = user.user.toObject();
		if (user.user.type == 'student') {
			sendEmail(emailType.STUDENT_WELCOME_EMAIL, user.user);
			user_data.profile_completed = false;
		} else if (user.user.type == 'counsellor') {
			sendEmail(emailType.COUNSELLOR_WELCOME_EMAIL, user.user);
		}
		return res.status(200).send({
			status: 'success',
			message: 'registration successful.',
			data: { user: user_data, token: user.token },
		});
	})(req, res, next);
};

exports.login = async function(req, res, next) {
	passport.authenticate('login', (err, user, info) => {
		if (err) {
			return res.status(500).send({ status: 'error', message: err.message });
		}
		if (info != undefined) {
			return res.status(400).send({ status: 'error', message: info.message });
		}

		// setting cookie jwt TESTCODE
		res.cookie('jwt', user.token, {
			expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
			httpOnly: true,
			secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
		});

		// Remove password from output
		user.user.password = undefined;

		if(user.user.Active === true){
			return res.status(200).send({
				status: 'success',
				message: `logged in successful.`,
				data: user,
			});
		}else{
			return res.status(400).send({
				status: 'error',
				message: `User is blocked. Please contact support team`
			});			
		}

	})(req, res, next);
};

exports.getLinkedinAccessToken = async function(req, res, next) {
	let postData = req.body;
	try 
    {   
		const body = {
			grant_type: 'authorization_code',
			code: postData.code,
			redirect_uri: postData.redirect_uri,
			client_id: postData.client_id,
			client_secret: postData.client_secret
		};
		new Promise((resolve, reject) => {
			request.post({url: 'https://www.linkedin.com/oauth/v2/accessToken', form: body }, (err, response, body) =>
			{ 
				var accesstoken = "";
				if(err) {
					reject(err);
				}
				else {
					console.log("response.statusCode555",response.statusCode);
					if (response.statusCode == 200) 
					{
					  var result  = JSON.parse(response.body);
					  accesstoken = result.access_token;
					  return res.status(200).json({
						status: 'Success',
						message: 'Access token genrate',
						token: accesstoken,
					 });
					}
				}
				resolve(accesstoken);
			}
		);
	  });
    }
    catch(error)
    {   
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'token genrate faild',
		});
    }

};

exports.getLinkedinDetailsFetch = async function(req, res, next) {
	let postData = req.body;
	try 
    {   
		return new Promise((resolve, reject) => {
			let options = {
			  method: "GET",
			  url: "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))",
			  headers: {
				"content-type": "application/json",
				charset: "UTF-8",
				"cache-control": "no-cache",
				Authorization: "Bearer " + postData.accessToken,
			  },
			  json: true,
			};
			request(options, function (err, response) {
			  if (err) {
				console.log(err);
				return reject({
				  code: 400,
				  message: "fetch details faild",
				  data: err,
				});
			  } else {
				let resultData = response.body;
				return res.status(200).json({
					status: 'Success',
					message: 'fetch details successfully',
					result: resultData,
				 });
			  }
			});
		  });
    }
    catch(error)
    {   
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'fetch details faild',
		});
    }
};

exports.socialLogin = async function(req, res, next) {
	passport.authenticate('socialLogin', (err, user, info) => {
		if (err) {
			return res.status(500).send({ status: 'error', message: err.message });
		}
		if (info != undefined) {
			return res
				.status(200)
				.send({ status: 'success', message: info.message, info_required: true });
		}
		return res.status(200).send({
			status: 'success',
			message: 'loggedin successful.',
			data: user,
		});
	})(req, res, next);
};

exports.profile = async function(req, res, next) {
	try {
		// let user = await userGetServices.getOne(
		// req.user._id,
		// getFields(req.user.type, req.user.user_type).basic
		// );
		// let user_data = user.toObject();
		// user_data.profile_completed = false;
		// if (req.user.type == 'student') {
		// 	const student_profile = await userGetServices.getProfileCompletionById(req.user._id);
		// 	if (student_profile && student_profile.profile_completion) {
		// 		user_data.profile_completed = student_profile.profile_completion.profile_completed;
		// 	}
		// }
		var populateQuery = [
			{ path: 'countryObj', select: '-_id -id name' },
			{ path: 'stateObj', select: '-_id -id name' },
			{ path: 'cityObj', select: '-_id -id name' },
		];
		
		let selectDoc ='';
		selectDoc = getFields(req.user.type, req.user.user_type).basic;
		User.findOne({ _id: req.user._id })
			.select(selectDoc).then(user=>{
				return res.status(200).json({
					status: 'success',
					message: 'user details',
					data: user,
				});
			})
		// let user = User.findOne(req.user._id);
		// console.log(user)
		
	} catch (error) {
		next(error);
	}
	
};

exports.logout = async function(req, res, next) {
	const token = getToken(req);
	redisClient.LPUSH('token', token, function(err, reply) {
		if (err) {
			return res
				.status(500)
				.send({ status: 'error', message: 'some problem occur. Please try again.' });
		}
		return res.status(200).send({
			status: 'success',
			message: 'logged out successfully.',
		});
	});
};

exports.edit = async function(req, res, next) {
	try {
		const userId = req.user.id;
		const user = await userPostServices.updateUser(
			req.body,
			userId,
			getFields(req.user.type, req.user.user_type).basic
		);
		if (user) {
			return res.status(200).json({
				status: 'success',
				message: 'user updated successfully',
				data: user,
			});
		}
	} catch (e) {
		next(e);
	}
};
