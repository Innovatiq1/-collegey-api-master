import { body, param, query, validationResult, oneOf, check } from 'express-validator';
import { userGetServices } from '../../services/userServices';
import { registrationType, genderTypes, partnerTypes } from '../../utilities/constant_variables';
import { validationText } from '../../utilities/appMessages';
const async = require('async');

export const syncError = (validatorsToSend, request, response, next) => {
	async.eachSeries(
		validatorsToSend,
		function(middleware, doneMiddleware) {
			middleware.bind(null, request, response, doneMiddleware)();
		},
		function(err) {
			if (err)
				return response
					.status(500)
					.json({ error: 'there was a problem with your middleware' });
			else next(err);
		}
	);
};
export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const extractedErrors = [];
		errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
		return res.status(422).json({
			status: 'error',
			errors: extractedErrors,
		});
	}
	next();
};

const commonValidations = {
	regTypeRequired: body('type')
		.trim()
		.exists()
		.notEmpty()
		.withMessage(validationText.REGISTRATION_TYPE_REQUIRED)
		.bail()
		.isIn(Object.values(registrationType))
		.withMessage(validationText.REGISTRATION_TYPE_INVALID)
		.bail(),
	userTypePartnerRequired: body('user_type')
		.exists()
		.notEmpty()
		.withMessage(validationText.USER_TYPE_REQUIRED)
		.bail(),
	userTypeRequired: body('user_type')
		.if(body('user_type').notEmpty())
		.trim()
		.isIn(Object.values(partnerTypes))
		.withMessage(validationText.USER_TYPE_INVALID)
		.bail(),

	nameRequired: body('name')
		.trim()
		.escape()
		.notEmpty()
		.withMessage(validationText.NAME_REQUIRED)
		.bail()
		.isLength({ min: 3 })
		.withMessage(validationText.MIN_3_CHAR_REQUIRED)
		.bail(),
	emailRequired: body('email')
		.trim()
		.notEmpty()
		.withMessage(validationText.EMAIL_REQUIRED)
		.bail()
		.isEmail()
		.withMessage(validationText.EMAIL_INVALID)
		.bail(),
	nameCheck: body('name')
		.if(body('name').exists())
		.notEmpty()
		.withMessage(validationText.NAME_REQUIRED)
		.bail()
		.isLength({ min: 3 })
		.withMessage(validationText.MIN_3_CHAR_REQUIRED)
		.bail(),
	passwordRequired: body('password')
		.trim()
		.notEmpty()
		.withMessage(validationText.PASSWORD_REQUIRED)
		.bail(),
	countryRequired: body('country')
		.trim()
		.notEmpty()
		.withMessage(validationText.COUNTRY_REQUIRED)
		.bail()
		.isInt()
		.withMessage(validationText.COUNTRY_INVALID)
		.bail(),
	stateRequired: body('state')
		.trim()
		.notEmpty()
		.withMessage(validationText.STATE_REQUIRED)
		.bail()
		.isInt()
		.withMessage(validationText.STATE_INVALID)
		.bail(),
	cityRequired: body('city')
		.trim()
		.notEmpty()
		.withMessage(validationText.CITY_REQUIRED)
		.bail()
		.isInt()
		.withMessage(validationText.CITY_INVALID)
		.bail(),

	countryIdCheck: body('country')
		.if(body('country').exists())
		.trim()
		.isInt()
		.withMessage(validationText.COUNTRY_INVALID)
		.bail(),
	stateIdCheck: body('state')
		.if(body('state').exists())
		.trim()
		.isInt()
		.withMessage(validationText.STATE_INVALID)
		.bail(),
	cityIdCheck: body('city')
		.if(body('city').exists())
		.trim()
		.isInt()
		.withMessage(validationText.CITY_INVALID)
		.bail(),

	qualificationRequired: body('qualification')
		.trim()
		.notEmpty()
		.withMessage(validationText.QUALIFICATION_REQUIRED)
		.bail(),
	emailCheck: body('email')
		.if(body('email').exists())
		.trim()
		.notEmpty()
		.withMessage(validationText.EMAIL_REQUIRED)
		.bail()
		.isEmail()
		.withMessage(validationText.EMAIL_INVALID)
		.bail()
		.custom((val, { req }) => {
			return userGetServices.checkEmailExist(val, req);
		})
		.bail(),
	confirmPasswordCheck: body('confirm_password')
		.trim()
		.notEmpty()
		.withMessage(validationText.CONFIRM_PASSWORD_REQUIRED)
		.bail()
		.custom((value, { req }) => {
			if (value != req.body.password)
				throw new Error(validationText.CONFIRM_PASSWORD_NOT_MATCHED);
			return true;
		}),
	parentDetailsJsonCheck: body('parents_details.*')
		.isJSON()
		.withMessage(validationText.PARENT_DETAILS_INVALID_FORMAT),
	schoolCounselorJsonCheck: body('school_counselor')
		.isJSON()
		.withMessage(validationText.SCHOOL_COUNSELORS_INVALID_FORMAT),
	portfolioJsonCheck: body('portfolio_info')
		.isJSON()
		.withMessage(validationText.PORTFOLIO_INVALID_FORMAT),
	phoneNumberCheck: body('phone_number.*.number')
		.if(body('phone_number').exists())
		.trim()
		.notEmpty()
		.withMessage(validationText.PHONE_REQUIRED)
		.bail()
		.custom((val, { req }) => {
			let obj = req.body.phone_number.find(obj => obj.number == val);
			return obj.tag == 'primary' ? userGetServices.checkPhoneExist(val, req) : true;
		})
		.bail(),
	phoneExtensionCheck: body('phone_number.*.extension')
		.if(body('phone_number').exists())
		.trim()
		.notEmpty()
		.withMessage(validationText.PHONE_EXTESNSION_REQUIRED)
		.bail(),
	phoneTagCheck: body('phone_number.*.tag')
		.if(body('phone_number').exists())
		.trim()
		.notEmpty()
		.withMessage(validationText.PHONE_TAG_REQUIRED)
		.bail(),
	studentParentEmailCheck: body('parents_details.*.email')
		.if(body('parents_details.*.email').notEmpty())
		.isEmail()
		.withMessage(validationText.EMAIL_INVALID)
		.bail(),
	studentCounselorEmailCheck: body('school_counselor.*.email')
		.if(body('school_counselor.*.email').notEmpty())
		.isEmail()
		.withMessage(validationText.EMAIL_INVALID)
		.bail(),
	gradeRequired: body('grade')
		.trim()
		.notEmpty()
		.withMessage(validationText.GRADE_REQUIRED)
		.bail(),
	passingYearCheck: body('passing_year')
		.trim()
		.if(body('passing_year').notEmpty())
		.isInt()
		.withMessage(validationText.PASSING_YEAR_INVALID)
		.bail(),
	invalidDobCheck: body('dob', validationText.DOB_INVALID)
		.trim()
		.optional({ checkFalsy: true })
		.isISO8601(),
	organizationNameRequired: body('impact_partner.organization_name')
		.if(body('impact_partner').exists())
		.trim()
		.notEmpty()
		.withMessage(validationText.ORGANIZATION_NAME_REQUIRED),

	profileOrganizationRequired: body('organization_name')
		.trim()
		.notEmpty()
		.withMessage(validationText.ORGANIZATION_NAME_REQUIRED),
	profileWebsiteRequired: body('impact_partner.website')
		.trim()
		.notEmpty()
		.withMessage(validationText.WEBSITE_REQUIRED),
	profileWebsiteUrlCheck: body('impact_partner.website')
		.if(body('impact_partner.website').notEmpty())
		.trim()
		.isURL()
		.withMessage(validationText.INVALID_WEBSITE_URL),
	iPDetailsRequired: body('impact_partner')
		.notEmpty()
		.withMessage(validationText.PARTNER_DETAILS_REQUIRED),
	iPcontactPersonRequired: body('impact_partner.contact_person_for_collegey')
		.notEmpty()
		.withMessage(validationText.CP_DETAILS_REQUIRED),
	cpNameCheck: body('impact_partner.contact_person_for_collegey.*.name')
		.if(body('impact_partner.contact_person_for_collegey').exists())
		.trim()
		.notEmpty()
		.withMessage(validationText.CP_NAME_REQUIRED),
	cpPhoneNumberRequired: body('impact_partner.contact_person_for_collegey.*.phone_number.number')
		.if(body('impact_partner.contact_person_for_collegey').exists())
		.trim()
		.notEmpty()
		.withMessage(validationText.CP_PHONE_REQUIRED),
	cpPhoneExtioneionRequired: body(
		'impact_partner.contact_person_for_collegey.*.phone_number.extension'
	)
		.if(body('impact_partner.contact_person_for_collegey').exists())
		.trim()
		.notEmpty()
		.withMessage(validationText.CP_EXTENSION_REQUIRED),
	cpPhoneTagRequired: body('impact_partner.contact_person_for_collegey.*.phone_number.tag')
		.if(body('impact_partner.contact_person_for_collegey').exists())
		.trim()
		.notEmpty()
		.withMessage(validationText.CP_TAG_REQUIRED),

	ipOptionStudentCheck: body('impact_partner_profile.option_for_students')
		.trim()
		.notEmpty()
		.withMessage(validationText.IP_OPTION_STUDENT_REQUIRED)
		.isIn(['Volunteer', 'Intern'])
		.withMessage(validationText.IP_OPTION_STUDENT_CHECK),
	ipSdgCheck: body('impact_partner_profile.sdg')
		.trim()
		.if(body('impact_partner_profile.sdg').notEmpty())
		.isInt()
		.withMessage(validationText.SDG_CHECK),
	profileSdgCheck: body('impact_partner_profile.sdg')
		.trim()
		.notEmpty()
		.withMessage(validationText.SDG_REQUIRED)
		.bail(),

	studentCountryIdCheck: body('student_profile.geography.country')
		.if(body('student_profile.geography.country').exists())
		.trim()
		.isInt()
		.withMessage(validationText.COUNTRY_INVALID)
		.bail(),
	studentStateIdCheck: body('student_profile.geography.state')
		.if(body('student_profile.geography.state').exists())
		.trim()
		.isInt()
		.withMessage(validationText.STATE_INVALID)
		.bail(),
	studentCityIdCheck: body('student_profile.geography.city')
		.if(body('student_profile.geography.city').exists())
		.trim()
		.isInt()
		.withMessage(validationText.CITY_INVALID)
		.bail(),
	geographyCompletedCheck: body(
		'student_profile.geography.is_completed',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.geography').notEmpty())
		.trim()
		.notEmpty()
		.bail()
		.isBoolean(),

	// historyPassingYearCheck:body("student_profile.history.passing_year").if(body('student_profile.history.passing_year').exists()).trim().isInt().withMessage(validationText.PASSING_YEAR_INVALID),
	historyEducationCheck: body('student_profile.history.education')
		.if(body('student_profile.history.education').exists())
		.isArray()
		.withMessage(validationText.SP_HISTORY_EDUCATION_CHECK),
	historyEducationTypeCheck: body('student_profile.history.education.*.type')
		.if(body('student_profile.history.education.*.type').exists())
		.notEmpty()
		.withMessage(validationText.SP_HISTORY_EDUCATION_TYPE_REQUIRED)
		.isIn(['School', 'College'])
		.withMessage(validationText.SP_HISTORY_EDUCATION_TYPE_CHECK),
	historyFieldofStudyCheck: body('student_profile.history.education.*.field_of_study')
		.if(body('student_profile.history.education.*.field_of_study').exists())
		.isArray()
		.withMessage(validationText.SP_HISTORY_EDUCATION_FIELD_STUDY_CHECK),
	historyStartYearCheck: body('student_profile.history.education.*.start_year')
		.if(body('student_profile.history.education.*.start_year').exists())
		.isInt()
		.withMessage(validationText.INVALID_YEAR),
	historyEndYearCheck: body('student_profile.history.education.*.end_year')
		.if(body('student_profile.history.education.*.end_year').exists())
		.isInt()
		.withMessage(validationText.INVALID_YEAR),

	historyCompletedCheck: body(
		'student_profile.history.is_completed',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.history').notEmpty())
		.trim()
		.notEmpty()
		.bail()
		.isBoolean(),
	projectsAnyBppAnswerCheck: body(
		'student_profile.projects.any_bpp.answer',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.projects.any_bpp').notEmpty())
		.trim()
		.notEmpty()
		.bail()
		.isBoolean(),
	projectsDescribeProjectCheck: body(
		'student_profile.projects.describe_any_project',
		validationText.SP_PROJECTS_PROJECT_DESCRIPTION_CHECK
	)
		.if(body('student_profile.projects.describe_any_project').exists())
		.isArray(),
	projectsDescribeProjectTitleCheck: body(
		'student_profile.projects.describe_any_project.*.title',
		validationText.SP_PROJECTS_PROJECT_TITLE_REQUIRED
	)
		.if(body('student_profile.projects.describe_any_project').notEmpty())
		.notEmpty(),
	projectsDescribeProjectDescCheck: body(
		'student_profile.projects.describe_any_project.*.description',
		validationText.SP_PROJECTS_PROJECT_DESCRIPTION_REQUIRED
	)
		.if(body('student_profile.projects.describe_any_project').notEmpty())
		.notEmpty(),
	projectsWritingSampleAnswerCheck: body(
		'student_profile.projects.writing_sample.*.answer',
		validationText.SP_PROJECTS_WITING_SAMPLE_ANSWER_REQUIRED
	)
		.if(body('student_profile.projects.writing_sample').notEmpty())
		.notEmpty(),
	projectsRecomendationCheck: body(
		'student_profile.projects.someone_said_something_or_recommendation',
		validationText.SP_PROJECTS_RECOMENDATION_CHECK
	)
		.if(body('student_profile.projects.someone_said_something_or_recommendation').exists())
		.isArray(),
	projectsRecomendationTitleRequired: body(
		'student_profile.projects.someone_said_something_or_recommendation.*.title',
		validationText.SP_PROJECTS_RECOMENDATION_TITLE_REQUIRED
	)
		.if(body('student_profile.projects.someone_said_something_or_recommendation').notEmpty())
		.notEmpty(),
	projectsAwardsCheck: body(
		'student_profile.projects.award',
		validationText.SP_PROJECTS_AWARDS_CHECK
	)
		.if(body('student_profile.projects.award').exists())
		.isArray(),
	projectsAwardsTitleRequired: body(
		'student_profile.projects.award.*.title',
		validationText.SP_PROJECTS_AWARDS_TITLE_REQUIRED
	)
		.if(body('student_profile.projects.award').notEmpty())
		.notEmpty(),
	projectsAwardsOrganisationRequired: body(
		'student_profile.projects.award.*.issuing_organisation',
		validationText.SP_PROJECTS_AWARDS_ISSUE_ORG_REQUIRED
	)
		.if(body('student_profile.projects.award').notEmpty())
		.notEmpty(),
	projectsAwardsDurationRequired: body(
		'student_profile.projects.award.*.duration',
		validationText.SP_PROJECTS_AWARDS_DURATION_REQUIRED
	)
		.if(body('student_profile.projects.award').notEmpty())
		.notEmpty(),
	projectCompletedCheck: body(
		'student_profile.projects.is_completed',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.projects').notEmpty())
		.trim()
		.notEmpty()
		.bail()
		.isBoolean(),

	waysInTouchDobCheck: body('student_profile.ways_to_be_in_touch.dob', validationText.DOB_INVALID)
		.if(body('student_profile.ways_to_be_in_touch').exists())
		.trim()
		.optional({ checkFalsy: true })
		.isISO8601(),
	waysInTouchPhoneNumberCheck: body(
		'student_profile.ways_to_be_in_touch.phone_number.number',
		validationText.PHONE_REQUIRED
	)
		.if(body('student_profile.ways_to_be_in_touch.phone_number').notEmpty())
		.trim()
		.notEmpty(),
	waysInTouchExtensionCheck: body(
		'student_profile.ways_to_be_in_touch.phone_number.extension',
		validationText.PHONE_EXTESNSION_REQUIRED
	)
		.if(body('student_profile.ways_to_be_in_touch.phone_number').notEmpty())
		.trim()
		.notEmpty(),
	waysInTouchTagCheck: body(
		'student_profile.ways_to_be_in_touch.phone_number.tag',
		validationText.PHONE_TAG_REQUIRED
	)
		.if(body('student_profile.ways_to_be_in_touch.phone_number').notEmpty())
		.trim()
		.notEmpty(),
	waysInTouchParentDetailsCheck: body(
		'student_profile.ways_to_be_in_touch.parents_details',
		validationText.PREF_PARENT_DETAILS_CHECK
	)
		.if(body('student_profile.ways_to_be_in_touch.parents_details').exists())
		.isArray(),
	waysInTouchParentNameRequired: body(
		'student_profile.ways_to_be_in_touch.parents_details.name',
		validationText.NAME_REQUIRED
	)
		.if(body('student_profile.ways_to_be_in_touch.parents_details').notEmpty())
		.trim()
		.notEmpty(),
	waysInTouchParentPhoneExtensionRequired: body(
		'student_profile.ways_to_be_in_touch.parents_details.phone_number.extension',
		validationText.PREF_PARENT_DETAILS_PHONE_EXTENSION_REQUIRED
	)
		.if(body('student_profile.ways_to_be_in_touch.parents_details.phone_number').notEmpty())
		.notEmpty(),
	waysInTouchParentPhoneRequired: body(
		'student_profile.ways_to_be_in_touch.parents_details.phone_number.number',
		validationText.PREF_PARENT_DETAILS_PHONE_NUMBER_REQUIRED
	)
		.if(body('student_profile.ways_to_be_in_touch.parents_details.phone_number').notEmpty())
		.notEmpty(),
	waysInTouchParentRelationCheck: body(
		'student_profile.ways_to_be_in_touch.parents_details.relation',
		validationText.PREF_PARENT_DETAILS_RELATION_CHECK
	)
		.if(body('student_profile.ways_to_be_in_touch.parents_details.relation').notEmpty())
		.trim()
		.isIn(['father', 'mother', 'guardian', 'other']),
	waysInTouchParentEmailCheck: body(
		'student_profile.ways_to_be_in_touch.parents_details.email',
		validationText.EMAIL_INVALID
	)
		.if(body('student_profile.ways_to_be_in_touch.parents_details.email').notEmpty())
		.trim()
		.isEmail(),

	waysInTouchCounselorDetailsCheck: body(
		'student_profile.ways_to_be_in_touch.school_counselor',
		validationText.PREF_COUNSELOR_DETAILS_CHECK
	)
		.if(body('student_profile.ways_to_be_in_touch.school_counselor').exists())
		.isArray(),
	waysInTouchCounselorNameRequired: body(
		'student_profile.ways_to_be_in_touch.school_counselor.*.name',
		validationText.NAME_REQUIRED
	)
		.if(body('student_profile.ways_to_be_in_touch.school_counselor').notEmpty())
		.trim()
		.notEmpty(),
	waysInTouchCounselorEmailCheck: body(
		'student_profile.ways_to_be_in_touch.school_counselor.*.email',
		validationText.EMAIL_INVALID
	)
		.if(body('student_profile.ways_to_be_in_touch.school_counselor.*.email').notEmpty())
		.trim()
		.isEmail(),
	waysInTouchCounselorPhoneExtensionRequired: body(
		'student_profile.ways_to_be_in_touch.school_counselor.*.phone_number.extension',
		validationText.PREF_PARENT_DETAILS_PHONE_EXTENSION_REQUIRED
	)
		.if(body('student_profile.ways_to_be_in_touch.school_counselor.*.phone_number').notEmpty())
		.notEmpty(),
	waysInTouchCounselorPhoneRequired: body(
		'student_profile.ways_to_be_in_touch.school_counselor.*.phone_number.number',
		validationText.PREF_PARENT_DETAILS_PHONE_NUMBER_REQUIRED
	)
		.if(body('student_profile.ways_to_be_in_touch.school_counselor.*.phone_number').notEmpty())
		.notEmpty(),
	waysInTouchCompletedCheck: body(
		'student_profile.ways_to_be_in_touch.is_completed',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.ways_to_be_in_touch').notEmpty())
		.trim()
		.isBoolean(),

	headedExpectedYearCheck: body(
		'student_profile.headed.expected_year_to_start',
		validationText.SP_OBJECT_FORMAT
	)
		.if(body('student_profile.headed.expected_year_to_start').notEmpty())
		.isJSON(),
	headedExpectedYearGradeCheck: body(
		'student_profile.headed.expected_year_to_start.grade',
		validationText.SP_HEADED_GRADE_REQUIRED
	)
		.if(body('student_profile.headed.expected_year_to_start').notEmpty())
		.notEmpty(),
	headedExpectedYearStartCheck: body(
		'student_profile.headed.expected_year_to_start.year',
		validationText.INVALID_YEAR
	)
		.if(body('student_profile.headed.expected_year_to_start').notEmpty())
		.notEmpty()
		.withMessage(validationText.SP_HEADED_GRADE_YEAR_REQUIRED)
		.bail()
		.trim()
		.isInt(),

	headedPreferredCountriesCheck: body(
		'student_profile.headed.preferred_countries',
		validationText.ARRAY_REQUIRED
	)
		.if(body('student_profile.headed.preferred_countries').notEmpty())
		.isArray(),
	headedWishStudyInstituteCheck: body(
		'student_profile.headed.institutes_Wishlist',
		validationText.SP_HEADED_INSTITUTE_REQUIRED
	)
		.if(body('student_profile.headed.institutes_Wishlist').exists())
		.isArray()
		.withMessage('Institutes must be array of string')
		.bail(),
	headedTestInfoTestCheck: body(
		'student_profile.headed.test_info',
		validationText.SP_HEADED_TEST_INFO_CHECK
	)
		.if(body('student_profile.headed.test_info').notEmpty())
		.isArray(),
	headedTestInfoTestNameRequired: body(
		'student_profile.headed.test_info.*.test_name',
		validationText.HEADED_TEST_NAME_REQUIRED
	)
		.if(body('student_profile.headed.test_info').notEmpty())
		.trim()
		.notEmpty(),
	headedTestInfoTestStatusCheck: body(
		'student_profile.headed.test_info.*.test_status',
		validationText.HEADED_TEST_STATUS
	)
		.if(body('student_profile.headed.test_info').notEmpty())
		.trim()
		.notEmpty()
		.withMessage(validationText.HEADED_TEST_STATUS_REQUIRED)
		.bail()
		.isIn(['taken', 'planned']),
	headedTestInfoTestDateCheck: body(
		'student_profile.headed.test_info.*.test_date',
		validationText.HEADED_TEST_DATE_INVALID
	)
		.if(body('student_profile.headed.test_info.*.test_date').notEmpty())
		.trim()
		.optional({ checkFalsy: true })
		.isISO8601(),
	headedWishStudyGradeCheck: body(
		'student_profile.headed.wish_to_study.*.grade',
		validationText.SP_HEADED_WISH_STUDY_GRADE_REQUIRED
	)
		.if(body('student_profile.headed.wish_to_study.*.grade').notEmpty())
		.notEmpty()
		.bail()
		.isIn(['ug', 'pg'])
		.withMessage(validationText.SP_HEADED_WISH_STUDY_GRADE_CHECK)
		.bail(),
	headedCompletedCheck: body(
		'student_profile.headed.is_completed',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.headed').notEmpty())
		.trim()
		.notEmpty()
		.bail()
		.isBoolean(),

	interestAreaCheck: body(
		'student_profile.interest.interest_area',
		validationText.INTEREST_AREA_REQUIRED
	)
		.if(body('student_profile.interest.interest_area').exists())
		.isArray()
		.withMessage('Interest are must be array of string')
		.bail(),
	interestFavSubjectCheck: body(
		'student_profile.interest.fav_subjects',
		validationText.INTEREST_AREA_REQUIRED
	)
		.if(body('student_profile.interest.fav_subjects').exists())
		.isArray()
		.withMessage('Favorite are must be array of string')
		.bail(),
	interestCompletedCheck: body(
		'student_profile.interest.is_completed',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.interest').notEmpty())
		.trim()
		.notEmpty()
		.bail()
		.isBoolean(),

	knowYouBetterPeopleInspireCheck: body(
		'student_profile.know_you_better.people_who_inspire_you.*.name',
		validationText.PEOPLE_INSPIRE_REQUIRED
	)
		.if(body('student_profile.know_you_better.people_who_inspire_you').exists())
		.trim()
		.notEmpty()
		.bail(),
	knowYouBetterFavBooksCheck: body(
		'student_profile.know_you_better.fav_books.*.name',
		validationText.FAV_BOOKS_REQUIRED
	)
		.if(body('student_profile.know_you_better.fav_books').exists())
		.trim()
		.notEmpty()
		.bail(),
	knowYouBetterFavMoviesCheck: body(
		'student_profile.know_you_better.fav_movies.*.name',
		validationText.FAV_MOVIES_REQUIRED
	)
		.if(body('student_profile.know_you_better.fav_movies').exists())
		.trim()
		.notEmpty()
		.bail(),
	knowYouBetterFavWebsiteCheck: body(
		'student_profile.know_you_better.fav_websites.*.name',
		validationText.FAV_WEBSITE_REQUIRED
	)
		.if(body('student_profile.know_you_better.fav_websites').exists())
		.trim()
		.notEmpty()
		.bail(),
	knowYouBetterFavMessageServiceCheck: body(
		'student_profile.know_you_better.fav_message_service.*.name',
		validationText.FAV_MESSAGE_SERVICE_REQUIRED
	)
		.if(body('student_profile.know_you_better.fav_message_service').exists())
		.trim()
		.notEmpty()
		.bail(),
	knowYouBetterAwardsCheck: body(
		'student_profile.know_you_better.awards.*.name',
		validationText.AWARDS_REQUIRED
	)
		.if(body('student_profile.know_you_better.awards').exists())
		.trim()
		.notEmpty()
		.bail(),
	knowYouBetterAwardsArrayCheck: body(
		'student_profile.know_you_better.awards',
		'Array is Required'
	)
		.if(body('student_profile.know_you_better.awards').exists())
		.isArray()
		.bail()
		.trim()
		.notEmpty()
		.bail(),
	knowYouBetterCompletedCheck: body(
		'student_profile.know_you_better.is_completed',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.know_you_better').notEmpty())
		.trim()
		.notEmpty()
		.bail()
		.isBoolean(),

	studiedFavSubjectsCheck: body(
		'student_profile.studied.fav_subjects.*.name',
		validationText.FAV_SUBJECT_REQUIRED
	)
		.if(body('student_profile.studied.fav_subjects').exists())
		.trim()
		.notEmpty()
		.bail(),
	studiedCompletedCheck: body(
		'student_profile.studied.is_completed',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.studied').notEmpty())
		.trim()
		.notEmpty()
		.bail()
		.isBoolean(),

	prefrencesPayementCheck: body(
		'student_profile.prefrences.how_would_like_to_pay',
		validationText.PREF_PAYMENT_CHECK
	)
		.if(body('student_profile.prefrences.how_would_like_to_pay').exists())
		.isArray()
		.bail(),
	prefrencesScholershipAnswerCheck: body(
		'student_profile.prefrences.wish_to_apply_for_scholarships.answer',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.prefrences.wish_to_apply_for_scholarships').notEmpty())
		.trim()
		.notEmpty()
		.withMessage(validationText.PREF_WISH_APPLY_SCHOLERSHIP_REQUIRED)
		.bail()
		.isBoolean(),
	prefrencesInterestedGapCheck: body(
		'student_profile.prefrences.interested_in_gap',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.prefrences.interested_in_gap').exists())
		.trim()
		.notEmpty()
		.bail()
		.isBoolean(),
	prefrencesCompletedCheck: body(
		'student_profile.prefrences.is_completed',
		validationText.INVALID_BOOLEAN
	)
		.if(body('student_profile.prefrences').notEmpty())
		.trim()
		.notEmpty()
		.bail()
		.isBoolean(),

	sPschoolNameRequired: body('school_partner.school_name')
		.trim()
		.notEmpty()
		.withMessage(validationText.SP_SCHOOL_NAME)
		.bail(),
	sPprincipalNameRequired: body('school_partner.principal_name')
		.trim()
		.notEmpty()
		.withMessage(validationText.SP_PRINCIPAL_NAME)
		.bail(),
	sPcounselorNameRequired: body('school_partner.counselor_name')
		.trim()
		.notEmpty()
		.withMessage(validationText.SP_COUNSELOR_NAME)
		.bail(),
	sPcurriculumRequired: body('school_partner.curriculum')
		.trim()
		.notEmpty()
		.withMessage(validationText.SP_CARRICULUM_NAME)
		.bail(),

	sPprofileDevelopmentProgramCheck: body('school_partner_profile.is_interested_in_dev_program')
		.trim()
		.isBoolean()
		.withMessage(validationText.INVALID_BOOLEAN),
	sPprofileEnrichmentCenterCheck: body('school_partner_profile.is_enrichment_center')
		.trim()
		.if(body('school_partner_profile.is_enrichment_center').exists())
		.isBoolean()
		.withMessage(validationText.INVALID_BOOLEAN)
		.bail(),
	sPprofileStdImpProjectCheck: body('school_partner_profile.student_with_impact_projects')
		.trim()
		.if(body('school_partner_profile.student_with_impact_projects').exists())
		.isInt()
		.withMessage(validationText.SP_STUDENT_IMPACT_PROJECT_NUMBER)
		.bail(),
	sPprofileCountryChoiceCheck: body(
		'school_partner_profile.countries_for_furthur_studies.*.country'
	)
		.trim()
		.if(body('school_partner_profile.countries_for_furthur_studies.*.country').notEmpty())
		.isInt()
		.withMessage(validationText.COUNTRY_INVALID)
		.bail(),

	uPuniversityNameRequired: body('university_partner.university_name')
		.trim()
		.notEmpty()
		.withMessage(validationText.UP_UNIVERSITY_NAME_REQUIRED)
		.bail(),
	uPuniversityAddressRequired: body('university_partner.address')
		.trim()
		.notEmpty()
		.withMessage(validationText.ADDRESS_REQUIRED)
		.bail(),
	uPuniversityCpRequired: body('university_partner.contact_person_for_collegey')
		.notEmpty()
		.withMessage(validationText.CP_DETAILS_REQUIRED)
		.bail(),
	uPuniversityCpNameRequired: body('university_partner.contact_person_for_collegey.*.name')
		.trim()
		.if(body('university_partner.contact_person_for_collegey').exists())
		.notEmpty()
		.withMessage(validationText.CP_NAME_REQUIRED)
		.bail(),
	uPuniversityCpPhoneNumberRequired: body(
		'university_partner.contact_person_for_collegey.*.phone_number.number'
	)
		.if(body('university_partner.contact_person_for_collegey.phone_number').notEmpty())
		.trim()
		.notEmpty()
		.withMessage(validationText.CP_PHONE_REQUIRED)
		.bail(),
	uPuniversityCpPhoneExtioneionRequired: body(
		'university_partner.contact_person_for_collegey.*.phone_number.extension'
	)
		.if(body('university_partner.contact_person_for_collegey.phone_number').notEmpty())
		.trim()
		.notEmpty()
		.withMessage(validationText.CP_EXTENSION_REQUIRED)
		.bail(),
	uPuniversityCpPhoneTagRequired: body(
		'university_partner.ontact_person_for_collegey.*.phone_number.tag'
	)
		.if(body('university_partner.contact_person_for_collegey.phone_number').notEmpty())
		.trim()
		.notEmpty()
		.withMessage(validationText.CP_TAG_REQUIRED)
		.bail(),

	uPuniversityProfileRequired: body('university_partner_profile')
		.notEmpty()
		.withMessage(validationText.UP_UNIVERSITY_PROFILE_REQUIRED)
		.bail(),
	uPuniversityProfileGradeCheck: body('university_partner_profile.offer_courses.grade')
		.if(body('university_partner_profile.offer_courses').notEmpty)
		.notEmpty()
		.withMessage(validationText.UP_COURSE_GRADE_REQUIRED)
		.bail()
		.isIn(['ug', 'pg'])
		.withMessage('Invalid Grade Value')
		.bail(),

	userIdRequired: check('user_id', validationText.USER_ID_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail()
		.isMongoId()
		.withMessage(validationText.USER_ID_INVALID),
	projectIdRequired: check('project_id', validationText.PROJECT_ID_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail()
		.isMongoId()
		.withMessage(validationText.PROJECT_ID_INVALID),
	resetPasswordIdRequired: body('id', validationText.USER_ID_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail()
		.isMongoId()
		.withMessage(validationText.USER_ID_INVALID),
	resetPasswordTokenRequired: param('token', validationText.TOEKN_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),

	programTitleRequired: body('title', validationText.TITLE_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	programTypeRequired: body('program_type', validationText.PROGRAM_TYPE_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail()
		.isIn(['Scholarship', 'Internship', 'Series', 'Program', 'Project', 'Conference'])
		.withMessage(validationText.INVALID_PROGRAM_TYPE),
	programRedirectURLCheck: body('redirect_link', validationText.INVALID_URL)
		.if(body('redirect_link').notEmpty())
		.isURL(),
	programCostCheck: body('cost', validationText.INVALID_COST)
		.if(body('cost').notEmpty())
		.isInt(),
	programIsPaidCheck: body('is_paid', validationText.INVALID_BOOLEAN)
		.if(body('is_paid').notEmpty())
		.isBoolean(),

		courseTitleRequired: body('title', validationText.TITLE_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),

		courseTypeRequired: body('course_type', validationText.COURSE_TYPE_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail()
		.isIn(['Scholarship', 'Internship', 'Series', 'Program', 'Course', 'Project', 'Conference'])
		.withMessage(validationText.INVALID_COURSE_TYPE),

		courseRedirectURLCheck: body('redirect_link', validationText.INVALID_URL)
		.if(body('redirect_link').notEmpty())
		.isURL(),
	courseCostCheck: body('cost', validationText.INVALID_COST)
		.if(body('cost').notEmpty())
		.isInt(),
	courseIsPaidCheck: body('is_paid', validationText.INVALID_BOOLEAN)
		.if(body('is_paid').notEmpty())
		.isBoolean(),

	blogTitleRequired: body('title', validationText.TITLE_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	blogShortDescriptionRequired: body(
		'short_description',
		validationText.SHORT_DESCRIPTION_REQUIRED
	)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	blogDescriptionRequired: body('description', validationText.DESCRIPTION_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	blogRedirectURLCheck: body('redirect_link', validationText.INVALID_URL)
		.if(body('redirect_link').notEmpty())
		.isURL(),
	blogCostCheck: body('cost', validationText.INVALID_COST)
		.if(body('cost').notEmpty())
		.isInt(),
	blogIsPaidCheck: body('is_paid', validationText.INVALID_BOOLEAN)
		.if(body('is_paid').notEmpty())
		.isBoolean(),

	webinarTitleRequired: body('title', validationText.TITLE_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	webinarDescriptionRequired: body('description', validationText.DESCRIPTION_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	webinarVideoURLCheck: body('video_url', validationText.INVALID_URL)
		.if(body('video_url').notEmpty())
		.isURL(),
	webinarCostCheck: body('cost', validationText.INVALID_COST)
		.if(body('cost').notEmpty())
		.isInt(),
	webinarIsPaidCheck: body('is_paid', validationText.INVALID_BOOLEAN)
		.if(body('is_paid').notEmpty())
		.isBoolean(),
	webinarDateCheck: body('date', validationText.INVALID_DATE_FORMAT)
		.if(body('date').notEmpty())
		.isISO8601(),

	projectTitleRequired: body('title', validationText.TITLE_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	projectDescriptionRequired: body('description', validationText.DESCRIPTION_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	projectPartnerCheck: body('partner', validationText.INVALID_ID)
		.if(body('partner').notEmpty())
		.isMongoId(),
	projectStudentCountCheck: body('students_count', validationText.INVALID_STUDENT_COUNT)
		.if(body('students_count').notEmpty())
		.isInt(),
	projectStartDateCheck: body('start_date', validationText.INVALID_DATE_FORMAT)
		.if(body('start_date').notEmpty())
		.isISO8601(),
	projectEndDateCheck: body('end_date', validationText.INVALID_DATE_FORMAT)
		.if(body('end_date').notEmpty())
		.isISO8601(),

	conferenceTitleRequired: body('title', validationText.TITLE_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	conferenceShortDescriptionRequired: body(
		'short_description',
		validationText.SHORT_DESCRIPTION_REQUIRED
	)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	conferenceDescriptionRequired: body('description', validationText.DESCRIPTION_REQUIRED)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
	conferenceRedirectURLCheck: body('redirect_link', validationText.INVALID_URL)
		.if(body('redirect_link').notEmpty())
		.isURL(),
	conferenceCostCheck: body('cost', validationText.INVALID_COST)
		.if(body('cost').notEmpty())
		.isInt(),
	conferenceIsPaidCheck: body('is_paid', validationText.INVALID_BOOLEAN)
		.if(body('is_paid').notEmpty())
		.isBoolean(),
	counsellorOrganizationRequired: body(
		'organization',
		validationText.COUNSELLOR_ORGANIZATION_REQUIRED
	)
		.exists()
		.bail()
		.notEmpty()
		.bail(),
};
exports.common = commonValidations;

const phoneValidationsArray = [
	commonValidations.phoneNumberCheck,
	commonValidations.phoneExtensionCheck,
	commonValidations.phoneTagCheck,
];

exports.phoneValidations = phoneValidationsArray;

export const commonSignupValidations = [
	commonValidations.userTypeRequired,
	commonValidations.nameRequired,
	commonValidations.emailCheck,
	commonValidations.passwordRequired,
	// commonValidations.confirmPasswordCheck
];

export const commonRegistrationValidations = [
	commonValidations.nameRequired,
	commonValidations.emailCheck,
	commonValidations.passwordRequired,
];

export const commonImpactPartnerValidations = [
	...phoneValidationsArray,
	commonValidations.countryRequired,
	commonValidations.stateRequired,
	commonValidations.cityRequired,
	//   commonValidations.organizationNameRequired,
	commonValidations.iPDetailsRequired,
	commonValidations.iPcontactPersonRequired,
	commonValidations.cpNameCheck,
	commonValidations.cpPhoneExtioneionRequired,
	commonValidations.cpPhoneNumberRequired,
	commonValidations.cpPhoneTagRequired,
	commonValidations.profileWebsiteUrlCheck,
];

export const commonSchoolPartnerValidations = [
	...phoneValidationsArray,
	commonValidations.countryRequired,
	commonValidations.stateRequired,
	commonValidations.cityRequired,
	commonValidations.sPcurriculumRequired,
	//   commonValidations.sPschoolNameRequired,
	commonValidations.sPprincipalNameRequired,
	commonValidations.sPcounselorNameRequired,
];

export const commonUniversityPartnerValidations = [
	...phoneValidationsArray,
	commonValidations.countryRequired,
	commonValidations.stateRequired,
	commonValidations.cityRequired,
	commonValidations.uPuniversityAddressRequired,
	commonValidations.uPuniversityCpRequired,
	commonValidations.uPuniversityCpNameRequired,
	commonValidations.uPuniversityCpPhoneNumberRequired,
	commonValidations.uPuniversityCpPhoneExtioneionRequired,
	commonValidations.uPuniversityCpPhoneTagRequired,
	//   commonValidations.uPuniversityNameRequired,
];

//Used on Admin and Frontend for Profile updation
export const commonImpactPartnerEditValidations = [
	commonValidations.ipOptionStudentCheck,
	// commonValidations.ipSdgCheck
];

export const commonSchoolPartnerProfileValidations = [
	commonValidations.sPprofileDevelopmentProgramCheck,
	commonValidations.sPprofileEnrichmentCenterCheck,
	commonValidations.sPprofileStdImpProjectCheck,
	// commonValidations.sPprofileCountryChoiceCheck
];

export const commonUniversityPartnerProfileValidations = [
	commonValidations.uPuniversityProfileRequired,
	commonValidations.uPuniversityProfileGradeCheck,
];

export const commonProgramValidations = [
	commonValidations.programTitleRequired,
	// commonValidations.programTypeRequired,
	commonValidations.programRedirectURLCheck,
	commonValidations.programCostCheck,
	commonValidations.programIsPaidCheck,
];

export const commonCourseValidations = [
	commonValidations.courseTitleRequired,
	// commonValidations.courseTypeRequired,
	commonValidations.courseRedirectURLCheck,
	commonValidations.courseCostCheck,
	commonValidations.courseIsPaidCheck,
];

export const commonBlogValidations = [
	commonValidations.blogTitleRequired,
	commonValidations.blogRedirectURLCheck,
	commonValidations.blogCostCheck,
	commonValidations.blogIsPaidCheck,
];

export const commonConferenceValidations = [
	commonValidations.conferenceTitleRequired,
	commonValidations.conferenceRedirectURLCheck,
	commonValidations.conferenceCostCheck,
	commonValidations.conferenceIsPaidCheck,
];

export const commonWebinarValidations = [
	commonValidations.webinarTitleRequired,
	commonValidations.webinarDescriptionRequired,
	commonValidations.webinarVideoURLCheck,
	commonValidations.webinarCostCheck,
	commonValidations.webinarIsPaidCheck,
	commonValidations.webinarDateCheck,
];

export const commonProjectValidations = [
	commonValidations.projectTitleRequired,
	commonValidations.projectDescriptionRequired,
	commonValidations.projectPartnerCheck,
	commonValidations.projectStudentCountCheck,
	commonValidations.projectStartDateCheck,
	commonValidations.projectEndDateCheck,
];

export const studentProfileValidations = [
	commonValidations.studentCountryIdCheck,
	commonValidations.studentStateIdCheck,
	commonValidations.studentCityIdCheck,
	commonValidations.geographyCompletedCheck,
	commonValidations.historyEducationCheck,
	commonValidations.historyEducationTypeCheck,
	commonValidations.historyFieldofStudyCheck,
	commonValidations.historyStartYearCheck,
	commonValidations.historyEndYearCheck,
	commonValidations.historyCompletedCheck,
	commonValidations.interestAreaCheck,
	commonValidations.interestFavSubjectCheck,
	commonValidations.interestCompletedCheck,

	commonValidations.knowYouBetterPeopleInspireCheck,
	commonValidations.knowYouBetterFavBooksCheck,
	commonValidations.knowYouBetterFavMoviesCheck,
	commonValidations.knowYouBetterFavWebsiteCheck,
	// commonValidations.knowYouBetterFavMessageServiceCheck,
	commonValidations.knowYouBetterCompletedCheck,
	// commonValidations.projectsAnyBppAnswerCheck,
	commonValidations.projectsDescribeProjectCheck,
	commonValidations.projectsDescribeProjectTitleCheck,
	commonValidations.projectsDescribeProjectDescCheck,
	// commonValidations.projectsWritingSampleAnswerCheck,
	commonValidations.projectsRecomendationCheck,
	commonValidations.projectsRecomendationTitleRequired,
	commonValidations.projectsAwardsCheck,
	commonValidations.projectsAwardsTitleRequired,
	// commonValidations.projectsAwardsOrganisationRequired,
	// commonValidations.projectsAwardsDurationRequired,
	commonValidations.projectCompletedCheck,

	commonValidations.headedWishStudyInstituteCheck,
	commonValidations.headedExpectedYearGradeCheck,
	commonValidations.headedExpectedYearStartCheck,
	commonValidations.headedPreferredCountriesCheck,
	// commonValidations.headedTestInfoTestCheck,
	// commonValidations.headedTestInfoTestNameRequired,
	// commonValidations.headedTestInfoTestStatusCheck,
	commonValidations.headedTestInfoTestDateCheck,
	// commonValidations.headedWishStudyGradeCheck,
	commonValidations.headedCompletedCheck,

	// commonValidations.prefrencesInterestedGapCheck,
	// commonValidations.prefrencesPayementCheck,
	commonValidations.prefrencesScholershipAnswerCheck,
	commonValidations.prefrencesCompletedCheck,
	commonValidations.waysInTouchDobCheck,

	// commonValidations.waysInTouchParentDetailsCheck,
	// commonValidations.waysInTouchExtensionCheck,
	// commonValidations.waysInTouchPhoneNumberCheck,
	// commonValidations.waysInTouchParentNameRequired,
	commonValidations.waysInTouchParentEmailCheck,
	commonValidations.waysInTouchParentRelationCheck,
	// commonValidations.waysInTouchParentPhoneExtensionRequired,
	// commonValidations.waysInTouchParentPhoneRequired,
	commonValidations.waysInTouchCounselorDetailsCheck,
	commonValidations.waysInTouchCounselorNameRequired,
	commonValidations.waysInTouchCounselorEmailCheck,
	// commonValidations.waysInTouchCounselorPhoneExtensionRequired,
	// commonValidations.waysInTouchCounselorPhoneRequired,
	commonValidations.waysInTouchCompletedCheck,
];

export const commonUserProjectMappingValidations = [
	commonValidations.userIdRequired,
	commonValidations.projectIdRequired,
];
