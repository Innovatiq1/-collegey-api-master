/* eslint-disable no-useless-catch */
import User from '../models/User';
import { getFields } from '../utilities/helpers';
import { getQueryParams, updateProfileCompletion } from '../utilities/helpers';
import { statusTypes, registrationType } from '../utilities/constant_variables';
import { emailType, sendEmail } from '../utilities/emailHelper';
import { STATES } from 'mongoose';
import Projects from '../models/Projects';
import console from 'console';
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
var generatePassword = require('password-generator');

exports.userPostServices = {
	async saveRequest(requestData) {
		try {
			const passwordHash = await bcrypt.hash(requestData.password, 10);
			requestData.password = passwordHash;
			const userdata = await User.create(requestData);
			return await User.findOne({ _id: userdata._id }).select(
				getFields(requestData.type, requestData.user_type).basic
			);
		} catch (e) {
			throw e;
		}
	},

	async updateUser(requestData, userId, selectDoc = '') {
		try {
			if (userId) {
				if (requestData.password) {
					const passwordHash = await bcrypt.hash(requestData.password, 10);
					requestData.password = passwordHash;
				}
				return await User.findOneAndUpdate({ _id: userId }, requestData, {
					new: true,
					select: selectDoc,
				});
			} else {
				_throwException('user not found | updateUser');
			}
		} catch (e) {
			throw e;
		}
	},

	async updateProfile(requestData, userId, selectDoc = '') {
		try {
			if (userId) {
				if (requestData.student_profile) {
					const user = await User.findById(userId).select(selectDoc);
					let mergedProfile = requestData.student_profile;
					if (user.student_profile) {
						if (user.student_profile.projects && requestData.student_profile.projects) {
							requestData.student_profile.projects = Object.assign(
								user.student_profile.projects,
								requestData.student_profile.projects
							);
						}
						mergedProfile = updateProfileCompletion(
							Object.assign(user.student_profile, requestData.student_profile)
						);
					} else {
						mergedProfile = updateProfileCompletion(requestData.student_profile, true);
					}
					
					return await User.findOneAndUpdate(
						{ _id: userId },
						{ $set: { student_profile: mergedProfile } },
						{ new: true, select: selectDoc }
					);
				} else {
					return await User.findOneAndUpdate({ _id: userId }, requestData, {
						new: true,
						select: selectDoc,
					});
				}
			} else {
				_throwException('user not found | updateProfile');
			}
		} catch (e) {
			throw e;
		}
	},

	async updateMentorProfile(requestData, userId, selectDoc = '') {
		try {
			if (userId) {
				if (requestData.mentor_profile) {
					const user = await User.findById(userId).select(selectDoc);
					let mergedProfile = requestData.mentor_profile;
					if (user.mentor_profile) {
						if (requestData.mentor_profile.projects) {
							requestData.mentor_profile.projects = Object.assign(
								user.mentor_profile.projects,
								requestData.mentor_profile.projects
							);
							if(!requestData.mentor_profile.projects._id){ 
								let new_project = await Projects.create({
									title: requestData.mentor_profile.projects.projectTitle,
									description: requestData.mentor_profile.projects.aboutProject,
									impact: requestData.mentor_profile.projects.aboutProject,
									partner: null,
									projectOwner: userId,
									sdg: null,
									hash_tags: requestData.mentor_profile.projects.keyword,
									image: requestData.mentor_profile.projects.bannerImage,
									skills: null,
									documents: null,
									students_count: requestData.mentor_profile.projects.maxNumberOfStudentsAllowed,
									start_date: requestData.mentor_profile.projects.startDate,
									end_date: requestData.mentor_profile.projects.lastDate,
									ask_questions: false,
									questions: null,
									contact_person: {
										name: user.name,
										phone_number: user.phone_number,
										email: user.email,
										linkedin_url: user.linkedin_url,
									},
									projectStatus: 'pending',
									projectType: 'mentor',
									mentor: userId,
									projectPlan: requestData.mentor_profile.projects.projectPlan,
									})
								}
						}
						mergedProfile = updateProfileCompletion(
							Object.assign(user.mentor_profile, requestData.mentor_profile)
						);
					} else {
						mergedProfile = updateProfileCompletion(requestData.mentor_profile, true);
					}
					return await User.findOneAndUpdate(
						{ _id: userId },
						{ $set: { mentor_profile: mergedProfile } },
						{ new: true, select: selectDoc }
					);
				} else {
					return await User.findOneAndUpdate({ _id: userId }, requestData, {
						new: true,
						select: selectDoc,
					});
				}
			} else {
				_throwException('user not found | updateProfile');
			}
		} catch (e) {
			throw e;
		}
	},

	async deleteUser(userId) {
		try {
			if (userId) {
				await User.updateOne({ _id: userId }, { status: 10 });
				return true;
			} else {
				_throwException('user not found | deleteUser');
			}
		} catch (e) {
			throw e;
		}
	},

	async forgotPassword(email) {
		try {
			let user = await User.findOne({ email: email });
			if (user && email) {
				const token = crypto.randomBytes(32).toString('hex');

				// Genrate New Password.
				const newpassword  = generatePassword(10, false, /[\w\d\?\-]/);
				const passwordHash = await bcrypt.hash(newpassword, 10);

				// Update Reset Token 

				let updateUser = await User.findOneAndUpdate(
					{_id: user._id},
					{reset_password_expires: Date.now() + 3600000,
					reset_password_token:token,password:passwordHash,
					attemptCalculation:0,attemptBlock:false},
					{new:true}
				);

				let user_mailObj = {
					name : updateUser.name,
					email: updateUser.email,
					password: newpassword,
				};
				sendEmail(emailType.RESET_PASSWORD, user_mailObj);
				return updateUser;
			} else {
				_throwException('user not found | forgotPassword');
			}
		} catch (e) {
			throw e;
		}
	},

	async resetPassword(data, token) {
		try {
			let user = await User.findOne({ _id: data.id, reset_password_token: token });
			if (user && token) {
				const passwordHash = await bcrypt.hash(data.password, 10);
				
				// Update Reset Token 
					
				let updateUser = await User.findOneAndUpdate(
					{_id: data.id,reset_password_token: token},
					{password:passwordHash,reset_password_token:''},
					{new:true}
				);
				return updateUser;
			
			} else {
				_throwException('user not found | resetPassword');
			}
		} catch (e) {
			throw e;
		}
	},

	async resetPasswordOldPassword(data) {
		try {
			let user = await User.findOne({ _id: data.id });
			if (user) {
				const isMatch2 = await bcrypt.compareSync(data.oldPassword,user.password);
					 if (!isMatch2) {
						_throwException('Old password does not matches | resetPasswordOldPassword');
					} else {
						const passwordHash = await bcrypt.hash(data.newPassword, 10);

						// Update Reset Token 
						let updateUser = await User.findOneAndUpdate(
							{_id: data.id},
							{password:passwordHash,reset_password_token:''},
							{new:true}
						); 
						return updateUser;
					}
			} else {
				_throwException('user not found | resetPasswordOldPassword');
			}
		} catch (error) {
			throw error;
		}
	},
	
	async addCommonStudentProfileSection(updateData, userId, selectDoc = '') {
		try {
			if (userId) {
				return await User.findOneAndUpdate(
					updateData.documentFilter,
					updateData.documentData,
					{ new: true, select: 'student_profile', upsert: true }
				);
			}
		} catch (e) {
			throw e;
		}
	},

	async editCommonStudentProfileSection(requestData, updateData, userId, docId, selectDoc = '') {
		try {
			if (userId && docId) {
				const data = await User.findOneAndUpdate(
					updateData.documentFilter,
					updateData.documentData,
					{ new: true, select: 'student_profile' }
				);
				return requestData;
			}
		} catch (e) {
			throw e;
		}
	},
	async deleteCommonStudentProfileSectionOld(key, userId, docId, selectDoc = '') {
		try {
			if (userId && docId) {
				const data = await User.findOneAndUpdate(
					{ _id: userId },
					{ $pull: { key: { _id: docId } } },
					{ new: true, select: 'student_profile', upsert: true }
				);
				return data;
			}
		} catch (e) {
			throw e;
		}
	},
	async deleteCommonStudentProfileSection(removeData, userId, docId) {
		try {
			if (userId && docId) {
				const data = await User.findOneAndUpdate(
					removeData.documentFilter,
					removeData.documentData,
					{ new: true, select: 'student_profile' }
				);
				return await User.findOneAndUpdate(
					{ _id: userId },
					{ $set: { student_profile: updateProfileCompletion(data.student_profile) } },
					{ new: true, select: 'student_profile' }
				);
			}
		} catch (e) {
			throw e;
		}
	},
};

exports.userGetServices = {
	async getAll(query) {
		const params = getQueryParams(query);
		// return await User.get(params.filter, params.limit, params.skip, params.sortBy, params.orderBy, getFields(query.type, query.user_type).basic);
		return await User.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			sort: params.sortBy,
			select: getFields(query.type, query.user_type).basic,
		});
	},

	async getOne(userId, selectDoc = '') {
		var populateQuery = [
			{ path: 'countryObj', select: '-_id -id name' },
			{ path: 'stateObj', select: '-_id -id name' },
			{ path: 'cityObj', select: '-_id -id name' },
		];
		
		return await User.findOne({ _id: userId })
			.select(selectDoc)
			.populate(populateQuery);
	},

	async getStudentProfile(slug) {
		const populateQuery = [
			{ path: 'countryObj', select: '-_id -id name' },
			{ path: 'stateObj', select: '-_id -id name' },
			{ path: 'cityObj', select: '-_id -id name' },
			{ path: 'preferred_countries_obj', select: '-_id name' },
		];
		const selectQuery =
			'name last_name email qualification slug avatar bannerImage country state city student_profile';
		const student = await User.findOne({
			slug: slug,
		})
			.select(selectQuery)
			.populate(populateQuery);
		if (student) {
			return student;
		} else {
			_throwException('user not found | getStudentProfile');
		}
	},
	async getStudentProfileType(type) {
		var populateQuery = [
			{ path: 'countryObj', select: '-_id -id name' },
			{ path: 'stateObj', select: '-_id -id name' },
			{ path: 'cityObj', select: '-_id -id name' },
		];
			const selectQuery =
			'name _id';
		return await User.find({ type: type})
		.select(selectQuery)
	},
	// async getStudentProfileType(type) {
	// 	console.log(type)

	// 	const populateQuery = [
	// 		{ path: 'countryObj', select: '-_id -id name' },
	// 		{ path: 'stateObj', select: '-_id -id name' },
	// 		{ path: 'cityObj', select: '-_id -id name' },
	// 		{ path: 'preferred_countries_obj', select: '-_id name' },
	// 	];
	// 	const selectQuery =
	// 		'name last_name email qualification slug avatar bannerImage country state city student_profile';
	// 	const student = await User.findAll({
	// 		type: type,
	// 	})
	// 		.select(selectQuery)
	// 		.populate(populateQuery);
	// 	if (student) {
	// 		return student;
	// 	} else {
	// 		_throwException('user not found | getStudentProfile');
	// 	}
	// },

	async getStudentProfileById(id) {
		const populateQuery = [
			{ path: 'countryObj', select: '-_id -id name' },
			{ path: 'stateObj', select: '-_id -id name' },
			{ path: 'cityObj', select: '-_id -id name' },
		];
		const selectQuery =
			'name last_name email qualification slug avatar bannerImage country state city student_profile';
		const student = await User.findOne({
			_id: id,
		})
			.select(selectQuery)
			.populate(populateQuery);
		if (student) {
			let profile = {
				name: student.name,
				last_name: student.last_name,
				email: student.email,
				qualification: student.qualification,
				avatar: student.avatar,
				countryObj: student.countryObj,
				stateObj: student.stateObj,
				cityObj: student.cityObj,
				profile_completion: student.profile_completion,
			};
			return profile;
		} else {
			_throwException('user not found | getStudentProfileById');
		}
	},

	async getMentorProfileById(id) {
		const populateQuery = [
			{ path: 'countryObj', select: '-_id -id name' },
			{ path: 'stateObj', select: '-_id -id name' },
			{ path: 'cityObj', select: '-_id -id name' },
		];
		const selectQuery =
			'name last_name email qualification slug avatar bannerImage country state city mentor_profile';
		const mentor = await User.findOne({
			_id: id,
		})
			.select(selectQuery)
			.populate(populateQuery);
		if (mentor) {
			let profile = {
				name: mentor.name,
				last_name: mentor.last_name,
				email: mentor.email,
				qualification: mentor.qualification,
				avatar: mentor.avatar,
				countryObj: mentor.countryObj,
				stateObj: mentor.stateObj,
				cityObj: mentor.cityObj,
				profile_completion: mentor.profile_completion,
				mentor_profile: mentor.mentor_profile
			};
			return profile;
		} else {
			_throwException('user not found | getStudentProfileById');
		}
	},
	async getProfileCompletionById(id) {
		const selectQuery = 'student_profile';
		const student = await User.findOne({
			_id: id,
		}).select(selectQuery);
		if (student) {
			return { profile_completion: student.profile_completion };
		} else {
			_throwException('user not found | getProfileCompletionById');
		}
	},

	async checkEmailExist(email, req) {
		try {
			let user_id = req.user && req.user.type != 'admin' ? req.user._id : null;
			if (req.params && req.params.id) {
				user_id = req.params.id;
			}
			let userModel = null;
			if (user_id) {
				userModel = await User.findOne({ email: email, _id: { $ne: user_id } });
			} else {
				userModel = await User.findOne({ email: email });
			}
			if (userModel) throw new Error('Email id already exists');
			return true;
		} catch (e) {
			throw e;
		}
	},
	async checkPhoneExist(phone_number, req) {
		try {
			let user_id = req.user && req.user.type != 'admin' ? req.user._id : null;
			if (req.params && req.params.id) {
				user_id = req.params.id;
			}
			let userModel = null;
			if (user_id) {
				userModel = await User.findOne({
					'phone_number.number': phone_number,
					'phone_number.tag': 'primary',
					_id: { $ne: user_id },
				});
			} else {
				userModel = await User.findOne({
					'phone_number.number': phone_number,
					'phone_number.tag': 'primary',
				});
			}
			if (userModel) throw new Error('Phone Number already exist');
			return true;
		} catch (e) {
			throw e;
		}
	},

	getProfileSectionData(obj, newKey, options) {
		let updateData = {};
		let documentFilter = { _id: options.userId };
		if (options.edit) {
			updateData[newKey + '.$'] = obj;
			documentFilter[newKey + '._id'] = obj._id;
			return { documentData: { $set: updateData }, documentFilter: documentFilter };
		} else if (options.delete) {
			updateData[newKey] = { _id: obj.id };
			return { documentData: { $pull: updateData }, documentFilter: documentFilter };
		} else {
			updateData[newKey] = obj;
			return { documentData: { $push: updateData }, documentFilter: documentFilter };
		}
	},
};

function _throwException(message) {
	throw {
		name: 'error in userServices.js',
		code: 400,
		message,
	};
}

function extend(target) {
	var sources = [].slice.call(arguments, 1);
	sources.forEach(function(source) {
		for (var prop in source) {
			target[prop] = source[prop];
		}
	});
	return target;
}

