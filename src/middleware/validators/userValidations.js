const appValidators = require('./appValidatiors');
import { partnerTypes } from '../../utilities/constant_variables';
//Admin Validations

//Student Registration
const validateStudentAdmin = [
	...appValidators.commonRegistrationValidations,
	...appValidators.phoneValidations,
	appValidators.common.qualificationRequired,
	appValidators.validate,
];
//Impact Partner Registration
const validateImpactPartnerAdmin = [
	...appValidators.commonRegistrationValidations,
	...appValidators.commonImpactPartnerValidations,
	appValidators.validate,
];
//School Partner Registration Validation
const validateSchoolPartnerAdmin = [
	...appValidators.commonRegistrationValidations,
	...appValidators.commonSchoolPartnerValidations,
	appValidators.validate,
];

//University Partner Registration Validation
const validateUniversityPartnerAdmin = [
	...appValidators.commonRegistrationValidations,
	...appValidators.commonUniversityPartnerValidations,
	appValidators.validate,
];

const validateUniversityPartnerEditAdmin = [
	appValidators.common.nameRequired,
	appValidators.common.emailCheck,
	...appValidators.commonUniversityPartnerValidations,
	appValidators.validate,
];

const validateImpactPartnerEditAdmin = [
	appValidators.common.nameRequired,
	appValidators.common.emailCheck,
	...appValidators.commonImpactPartnerValidations,
	appValidators.validate,
];
const validateStudentEditAdmin = [
	appValidators.common.nameRequired,
	...appValidators.phoneValidations,
	appValidators.common.qualificationRequired,
	appValidators.validate,
];

const validateSchoolPartnerEditAdmin = [
	appValidators.common.nameRequired,
	appValidators.common.emailCheck,
	...appValidators.commonSchoolPartnerValidations,
	appValidators.validate,
];

const imPartnerProfileValidations = [
	...appValidators.commonImpactPartnerEditValidations,
	appValidators.validate,
];
const schoolPartnerProfileValidations = [
	...appValidators.commonSchoolPartnerProfileValidations,
	appValidators.validate,
];

const universityPartnerProfileValidations = [
	...appValidators.commonUniversityPartnerProfileValidations,
	appValidators.validate,
];

//Used on Admin
const studentProfileValidations = [
	...appValidators.studentProfileValidations,
	appValidators.validate,
];

//Front End Validations
const validateStudent = [
	...appValidators.commonSignupValidations,
	appValidators.common.qualificationRequired,
	appValidators.validate,
];

const validateCounsellor = [
	...appValidators.commonRegistrationValidations,
	appValidators.common.counsellorOrganizationRequired,
	appValidators.validate,
];

const validateImpactPartner = [
	appValidators.common.userTypePartnerRequired,
	...appValidators.commonSignupValidations,
	...appValidators.commonImpactPartnerValidations,
	appValidators.common.profileWebsiteRequired,
	appValidators.validate,
];

const validateSchoolPartner = [
	appValidators.common.userTypePartnerRequired,
	...appValidators.commonSignupValidations,
	...appValidators.commonSchoolPartnerValidations,
	appValidators.validate,
];

const validateUniversityPartner = [
	appValidators.common.userTypePartnerRequired,
	...appValidators.commonSignupValidations,
	...appValidators.commonUniversityPartnerValidations,
	appValidators.validate,
];

exports.validateLogin = [
	appValidators.common.emailRequired,
	appValidators.common.passwordRequired,
	appValidators.validate,
];

const validateStudentEdit = [
	appValidators.common.nameCheck,
	// ...appValidators.phoneValidations,
	// appValidators.common.qualificationRequired,
	appValidators.validate,
];

const validateMentorEdit = [
	appValidators.common.nameCheck,
	// ...appValidators.phoneValidations,
	// appValidators.common.qualificationRequired,
	appValidators.validate,
];

const validateCounsellorEdit = [
	appValidators.common.nameCheck,
	appValidators.common.emailCheck,
	appValidators.validate,
];
const validateImpactPartnerEdit = [
	appValidators.common.nameCheck,
	appValidators.common.emailCheck,
	...appValidators.commonImpactPartnerValidations,
	appValidators.common.profileWebsiteRequired,
	appValidators.validate,
];

const validateSchoolPartnerEdit = [
	appValidators.common.nameCheck,
	appValidators.common.emailCheck,
	...appValidators.commonSchoolPartnerValidations,
	appValidators.validate,
];

const validateUniversityPartnerEdit = [
	appValidators.common.nameCheck,
	appValidators.common.emailCheck,
	...appValidators.commonUniversityPartnerValidations,
	appValidators.validate,
];

const registrationValidation = [
	appValidators.common.regTypeRequired,
	appValidators.common.userTypeRequired,
	appValidators.validate,
];
const partnerregistrationValidation = [
	appValidators.common.regTypeRequired,
	appValidators.common.userTypePartnerRequired,
	appValidators.common.userTypeRequired,
	appValidators.validate,
];

export const userProjectMappingValidation = [
	...appValidators.commonUserProjectMappingValidations,
	appValidators.validate,
];

export const validateProgram = [...appValidators.commonProgramValidations, appValidators.validate];

export const validateCourse = [...appValidators.commonCourseValidations, appValidators.validate];

export const validateBlog = [...appValidators.commonBlogValidations, appValidators.validate];

export const validateConference = [
	...appValidators.commonConferenceValidations,
	appValidators.validate,
];

export const validateWebinar = [...appValidators.commonWebinarValidations, appValidators.validate];

export const validateProject = [...appValidators.commonProjectValidations, appValidators.validate];

export const userProjectUserIdValidation = [
	appValidators.common.userIdRequired,
	appValidators.validate,
];

export const userProjectProjectIdValidation = [
	appValidators.common.projectIdRequired,
	appValidators.validate,
];

export const forgotPasswordValidation = [
	appValidators.common.emailRequired,
	appValidators.validate,
];

export const resetPasswordTokenValidation = [
	appValidators.common.resetPasswordTokenRequired,
	appValidators.validate,
];

export const resetPasswordValidations = [
	appValidators.common.resetPasswordIdRequired,
	appValidators.common.resetPasswordTokenRequired,
	appValidators.common.passwordRequired,
	appValidators.validate,
];
exports.RegisterOrCreateUserValidation = (request, response, next) => {
	let partnerValidations = [];
	partnerValidations[partnerTypes.IMPACT_PARTNER] = validateImpactPartner;
	partnerValidations[partnerTypes.SCHL_PARTNER] = validateSchoolPartner;
	partnerValidations[partnerTypes.UNIVERSITY_PARTNER] = validateUniversityPartner;
	let validators = {
		api: {
			student: validateStudent,
			partner: partnerValidations,
			counsellor: validateCounsellor,
		},
		admin: {
			student: validateStudentAdmin,
			'impact-partner': validateImpactPartnerAdmin,
			'school-partner': validateSchoolPartnerAdmin,
			'university-partner': validateUniversityPartnerAdmin,
		},
	};
	let validatorsToSend = [];
	try {
		if (request.customOrigin == 'api') {
			if (request.body.type == 'student' || request.body.type == 'counsellor' || request.body.type == 'mentor') {
				validatorsToSend =
					validators[request.customOrigin][request.body.type] || registrationValidation;
			} else {
				validatorsToSend =
					validators[request.customOrigin][request.body.type][request.body.user_type] ||
					partnerregistrationValidation;
			}
		} else {
			validatorsToSend = validators[request.customOrigin][request.params.type] || [];
		}

		// console.log(validatorsToSend);
	} catch (error) {
		return response.status(500).json({ error: 'invalid requested path' });
	}
	appValidators.syncError(validatorsToSend, request, response, next);
};

exports.ProfileUpdateValidation = (request, response, next) => {
	let partnerValidations = [];
	partnerValidations[partnerTypes.IMPACT_PARTNER] = imPartnerProfileValidations;
	partnerValidations[partnerTypes.SCHL_PARTNER] = schoolPartnerProfileValidations;
	partnerValidations[partnerTypes.UNIVERSITY_PARTNER] = universityPartnerProfileValidations;
	let validators = {
		api: { student: studentProfileValidations, partner: partnerValidations },
		admin: {
			student: studentProfileValidations,
			'impact-partner': imPartnerProfileValidations,
			'school-partner': schoolPartnerProfileValidations,
			'university-partner': universityPartnerProfileValidations,
		},
	};
	let validatorsToSend = [];
	try {
		if (request.customOrigin == 'api') {
			if (request.user.type == 'student' || request.user.type == 'mentor') {
				validatorsToSend = validators[request.customOrigin][request.user.type];
			} else {
				validatorsToSend =
					validators[request.customOrigin][request.user.type][request.user.user_type];
			}
		} else {
			validatorsToSend = validators[request.customOrigin][request.params.type] || [];
		}
	} catch (error) {
		return response.status(500).json({ error: 'invalid requested path' });
	}
	appValidators.syncError(validatorsToSend, request, response, next);
};
exports.UserEditValidation = (request, response, next) => {
	let partnerValidations = [];
	partnerValidations[partnerTypes.IMPACT_PARTNER] = validateImpactPartnerEdit;
	partnerValidations[partnerTypes.SCHL_PARTNER] = validateSchoolPartnerEdit;
	partnerValidations[partnerTypes.UNIVERSITY_PARTNER] = validateUniversityPartnerEdit;
	let validators = {
		api: {
			student: validateStudentEdit,
			mentor: validateMentorEdit,
			partner: partnerValidations,
			counsellor: validateCounsellorEdit,
		},
		admin: {
			student: validateStudentEditAdmin,
			'impact-partner': validateImpactPartnerEditAdmin,
			'school-partner': validateSchoolPartnerEditAdmin,
			'university-partner': validateUniversityPartnerEditAdmin,
		},
	};
	let validatorsToSend = [];
	try {
		if (request.customOrigin == 'api') {
			if (request.user.type == 'student' || request.user.type == 'counsellor' || request.user.type == 'mentor') {
				validatorsToSend = validators[request.customOrigin][request.user.type];
			} else {
				validatorsToSend =
					validators[request.customOrigin][request.user.type][request.user.user_type];
			}
		} else {
			validatorsToSend = validators[request.customOrigin][request.params.type] || [];
		}
	} catch (error) {
		return response.status(500).json({ error: 'invalid requested path' });
	}
	appValidators.syncError(validatorsToSend, request, response, next);
};
