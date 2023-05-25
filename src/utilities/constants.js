/* eslint-disable node/no-unsupported-features/es-syntax */
import Enum from 'enum';
import {
	studentTypes,
	partnerTypes,
	genderTypes,
	adminTypes,
	statusTypes,
	registrationType,
	studentGrades,
} from './constant_variables';

exports.ROLES = {
	ADMIN: 'admin',
	USER: 'user',
};

exports.EXCLUDED_URLS = Object.freeze({
	LOGIN: '/auth/login',
	SOCIAL_LOGIN: '/auth/social-login',
	SIGNUP: '/auth/register',
	SIGNUP_STUDENT: '/auth/register/student',
	SIGNUP_ADMIN: '/auth/register/admin',
	SIGNUP_IMPACT_PARTNER: '/auth/register/impact-partner',
	FORGOT_PASSWORD: '/common/forgot-password',
	RESET_PASSWORD: '/common/reset-password',
	STUDENT_PROFILE: '/profile/student-profile',
	BLOGS: '/resources/blogs',
	BLOG_DETAIL: '/resources/blog',
	INVITEE: '/invitee/',
	ACTIVATE: '/invitee/activate',
	PROGRAMS: '/resources/programs',
	PROGRAMS_SLUG: '/resources/programs-slug',
	COURSES: '/resources/courses',
	CAREER: '/career/create',
	INVEST: '/invest/create',
	FUND: '/collegefund/create',
	SUBSCRIPTIONS: '/subscription/create',
	RESUME: '/common/upload-resume/:source',
});

exports.ROLESNAMES = Object.freeze({
	ADMIN: 1,
	IMPACT_PARTNER: 2,
});

exports.genderTypesEnum = new Enum({
	Male: genderTypes.MALE,
	Female: genderTypes.FEMALE,
	Other: genderTypes.OTHERS,
});

exports.studenTypesEnum = new Enum({
	'Student in school': studentTypes.STDENT_IN_SCHL,
	'Student in college': studentTypes.STDENT_IN_CLG,
	'Graduated from school': studentTypes.GRAD_IN_SCHL,
	'Graduated from college': studentTypes.GRAD_IN_CLG,
	Other: studentTypes.OTHERS,
	test: studentTypes.TEST,
});

exports.partnerTypesEnum = new Enum({
	'Impact Partner': partnerTypes.IMPACT_PARTNER,
	'School Partner': partnerTypes.SCHL_PARTNER,
	'University Partner': partnerTypes.UNIVERSITY_PARTNER,
});

exports.adminTypesEnum = new Enum({
	'Impact Partner': adminTypes.SUPER_ADMIN,
	'School Partner': adminTypes.PARTIAL_ADMIN,
});

exports.statusTypesEnum = new Enum({
	Active: statusTypes.ACTIVE,
	'In-Active': statusTypes.INACTIVE,
	Deleted: statusTypes.DELETED,
});

exports.registrationTypeByRoute = Object.freeze({
	student: registrationType.STUDENT,
	'impact-partner': registrationType.PARTNER,
	'school-partner': registrationType.PARTNER,
	'university-partner': registrationType.PARTNER,
});

exports.userTypeByRoute = Object.freeze({
	'impact-partner': partnerTypes.IMPACT_PARTNER,
	'school-partner': partnerTypes.SCHL_PARTNER,
	'university-partner': partnerTypes.UNIVERSITY_PARTNER,
});

exports.studentGradesEnum = new Enum({
	'8 or less': studentGrades.CLASS_8_OR_LESS,
	'9': studentGrades.CLASS_9,
	'10': studentGrades.CLASS_10,
	'11': studentGrades.CLASS_11,
	'12': studentGrades.CLASS_12,
	'High School graduate/college': studentGrades.HS_GRADUATE_COLLEGE,
});

exports.studentPofileAttrCount = Object.freeze({
	geography: 6,
	// history: 2,
	history_updated: 1, 
	interest: 3,
	know_you_better: 8,
	projects: 6,
	headed: 5,
	prefrences: 5,
	ways_to_be_in_touch: 6,
});

exports.mentorProfileAttrCount = Object.freeze({
	profile:15,
	officeHours:2,
	projects:11
})

exports.studentsQuestionDefaultStatus = Object.freeze({
	ted_talk: false,
	teaching_skill: false,
	learning_skill: false,
	impact: false,
	interview_media_house: false,
	work_title: false,
	city_country: false,
});

exports.studentsQuestionDefaultStatusNew = {
	ted_talk: false,
	teaching_skill: false,
	learning_skill: false,
	impact: false,
	interview_media_house: false,
	work_title: false,
	city_country: false,
};

exports.studentsQuestions = Object.freeze({
	ted_talk: 'What is your TED talk about?',
	teaching_skill: 'What are you providing mentorship for?',
	learning_skill: 'What skills are you learning?',
	impact: 'What impact have you made?',
	interview_media_house: 'Which media house is trying to interview you for a show?',
	work_title: "What's your work title?",
	city_country: 'What City/Country you are living in?',
});

// exports.myEnum = Object.freeze({studenTypesEnum});
