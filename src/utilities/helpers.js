/* eslint-disable node/no-unsupported-features/es-syntax */
import {
	ROLESNAMES,
	registrationTypeByRoute,
	userTypeByRoute,
	studentPofileAttrCount,
	mentorProfileAttrCount
} from '../utilities/constants';

export function validateModel(name, model) {
	const responseValidation = swaggerSpec.validateModel(name, model, false, true);
	if (!responseValidation.valid) {
		console.error(responseValidation.errors);
		throw new Error(`Model doesn't match Swagger contract`);
	}
}
export function getFields(type, user_type) {
	let fields = { basic: '', profile: '' };
	switch (type) {
		case 'student': {
			return (fields = { basic: '', profile: '-_id student_profile' });
		}
		case 'partner': {
			if (user_type == 11) {
				return (fields = {
					basic:
						'name email password gender phone_number slug status type user_type avatar country state city impact_partner',
					profile: '-_id impact_partner_profile',
				});
			}
			if (user_type == 12) {
				return (fields = {
					basic:
						'name email password gender phone_number slug status type user_type avatar country state city school_partner',
					profile: '-_id school_partner_profile',
				});
			}
			if (user_type == 13) {
				return (fields = {
					basic:
						'name email password gender phone_number slug status type user_type avatar country state city university_partner',
					profile: '-_id university_partner_profile',
				});
			}
		}
		case 'mentor': {
			return (fields = { basic: '', profile: '-_id mentor_profile' });
		}
		default: {
			return fields;
		}
	}
}

export function getRoleName(val) {
	const rolesArray = [];
	Object.keys(ROLESNAMES).forEach(function(key, value) {
		rolesArray.push(key);
	});
	return rolesArray[val];
}

export function getToken(req) {
	if (!req.headers.authorization) {
		return null;
	}
	const token = req.headers.authorization.split(' ');
	return token[1];
}

export function getQueryParams(params, statusCheck = null) {
	let statusFilter = { status: { $in: [1, 2] } };
	if (statusCheck) {
		statusFilter = { status: { $in: [1] } };
	}
	let { limit, orderBy, page, sortBy, skip } = params;
	delete params.limit;
	delete params.skip;
	delete params.sortBy;
	delete params.page;
	delete params.orderBy;
	return { filter: Object.assign(statusFilter, params), limit, skip, page, sortBy, orderBy };
}
export function updateRequestData(req) {
	const requestedUri = req.url.split('/');
	req.body.type = registrationTypeByRoute[requestedUri[1]] || '';
	req.body.user_type = userTypeByRoute[requestedUri[1]] || '';
}
export function invertObject(obj) {
	const ret = {};
	Object.keys(obj).forEach(key => {
		ret[obj[key]] = key;
	});
	return ret;
}

export function updateProfileCompletion(studentProfile, firstTime = false) {
	for (const [key, count] of Object.entries(studentPofileAttrCount)) {
		if (studentProfile[key]) {
			let profileKeyLength = firstTime
				? Object.keys(studentProfile[key]).length
				: Object.keys(studentProfile[key].toJSON()).length;
			
			studentProfile[key].is_completed =
				!isProfileInnerFieldsBlank(studentProfile[key], firstTime) &&
				profileKeyLength >= count;
		}
	}
	return studentProfile;
}

export function updateMentorProfileCompletion(studentProfile, firstTime = false) {
	for (const [key, count] of Object.entries(mentorProfileAttrCount)) {
		if (studentProfile[key]) {
			let profileKeyLength = firstTime
				? Object.keys(studentProfile[key]).length
				: Object.keys(studentProfile[key].toJSON()).length;
			studentProfile[key].is_completed =
				!isProfileInnerFieldsBlank(studentProfile[key], firstTime) &&
				profileKeyLength >= count;
		}
	}
	return studentProfile;
}

function isProfileInnerFieldsBlank(data, firstTime = false) {
	if (data) {
		let profileData = firstTime ? data : data.toJSON();
		if (Object.keys(profileData).length < 2) {
			return true;
		}
		let val = Object.values(profileData).some(function(value) {
			return (
				typeof value != 'boolean' &&
				(value == undefined || value == null || value == '' || value.length == 0)
			);
		});
		return val;
	}
}

export function getProfileCompletion(studentProfile) {
	let profile_status = {},
		profile_value = 0,
		total_profile_value = Object.keys(studentPofileAttrCount).length,
		profile_text = 'Beginner';
	for (let [key, innerObject] of Object.entries(studentProfile)) {
		profile_status[key] = innerObject.is_completed;
		if (innerObject.hasOwnProperty('is_completed') && innerObject.is_completed == true)
			profile_value++;
	}
	let profile_percentage =
		profile_value == 0 ? 0 : Math.ceil((profile_value * 100) / total_profile_value);
	let profile_completed = profile_percentage >= 75;
	if (profile_percentage == 100) profile_text = 'Expert';
	else if (profile_percentage >= 75) {
		profile_text = 'Advanced';
	} else if (profile_percentage >= 50) profile_text = 'Intermediate';
	return { profile_percentage, profile_text, profile_status, profile_completed };
}

export function getMentorProfileCompletion(studentProfile) {
	let profile_status = {},
		profile_value = 0,
		total_profile_value = Object.keys(mentorProfileAttrCount).length,
		profile_text = 'Beginner';
	for (let [key, innerObject] of Object.entries(studentProfile)) {
		if(innerObject.hasOwnProperty('is_completed')){
			profile_status[key] = innerObject.is_completed;
		}
		if (innerObject.hasOwnProperty('is_completed') && innerObject.is_completed == true)
			profile_value++;
	}
	let profile_percentage =
		profile_value == 0 ? 0 : Math.ceil((profile_value * 100) / total_profile_value);
	let profile_completed = profile_percentage >= 75;
	if (profile_percentage == 100) profile_text = 'Expert';
	else if (profile_percentage >= 75) {
		profile_text = 'Advanced';
	} else if (profile_percentage >= 50) profile_text = 'Intermediate';
	return { profile_percentage, profile_text, profile_status, profile_completed };
}

export function getExcelDataFromFile(file) {
	const excelToJson = require('convert-excel-to-json');
	var fs = require('fs');
	const result = excelToJson({
		sourceFile: file,
		header: { rows: 1 },
	});
	fs.unlink(file, function(err) {
		if (err) return console.log(err);
	});
	return Object.values(result)[0]; //Sheet1
}
