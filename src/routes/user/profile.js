/* eslint-disable node/no-unsupported-features/es-syntax */
// eslint-disable-next-line import/named
import { ProfileUpdateValidation } from '../../middleware/validators/userValidations';
import fileUpload from '../../config/multerLocal';

const router = require('express').Router();
const profile = require('../../controllers/user/profileController');
const userProjectController = require('../../controllers/admin/userProjectsController');
const counsellor = require('../../controllers/user/counsellor');

router.get('/', profile.view).put('/', ProfileUpdateValidation, profile.edit);
router.get('/mentor', profile.view).put('/mentor',profile.editMentor);

// Update Mentor Profile Step
router.post('/updateMentorProfileStep01',profile.updateMentorProfileStep01);
router.post('/updateMentorProfileStep02',profile.updateMentorProfileStep02);
router.post('/updateMentorProfileStep03',profile.updateMentorProfileStep03);
router.post('/updateMenprojectStatus',profile.updateMenprojectStatus);

router.post('/updateMenprogramStatus',profile.updateMenprogramStatus);

// Update Project Review
router.post('/updateReviewproject',profile.updateReviewproject);

router.post('/updateReviewprogram',profile.updateReviewprogram);

// Update Project Dataprof
router.post('/updateProjectfieldData',profile.updateProjectfieldData);
router.post('/updateInvitationProjectData',profile.updateInvitationProjectData);

// Update Pdf Data
router.post('/updatePdfInUser',profile.updatePdfInUser);

router.post('/updatePdfProgramInUser',profile.updatePdfProgramInUser);

router.post('/student-education', profile.addEducation);
router.post('/student-education-plans', profile.addEducationPlans);

router.post('/RemoveStudentEducation', profile.RemoveStudentEducation);
router
	.put('/student-education/:id', ProfileUpdateValidation, profile.editEducation)
	.delete('/student-education/:id', profile.deleteEducation);

router.post('/student-project', profile.addProfileProject);
router
	.put('/student-project/:id', profile.editProfileProject)
	.delete('/student-project/:id', profile.deleteProfileProject);

router.post('/student-award', profile.addProfileAward);
router
	.put('/student-award/:id', profile.editProfileAward)
	.delete('/student-award/:id', profile.deleteProfileAward);

router.post('/student-recommendation', profile.addProfileRecommendation);
router
	.put('/student-recommendation/:id', profile.editProfileRecommendation)
	.delete('/student-recommendation/:id', profile.deleteProfileRecommendation);

router.post('/student-writing-sample', profile.addProfileWritingSample);
router
	.put('/student-writing-sample/:id', profile.editProfileWritingSample)
	.delete('/student-writing-sample/:id', profile.deleteProfileWritingSample);

router.get('/student-profile/:url_slug', profile.getstudentProfile);
router.get('/student-profileType/:type', profile.getstudentProfileTypeData);

router.get('/student-dashboard', profile.studentDashboard);
router.get('/student-mainDashboard', profile.studentMainDashboard);
router.get('/student-dashboard-header', profile.studentDashboardHeader);
router.put('/student-questionnaire', profile.editQuestionnaire);

router.post('/student-project-signup', profile.studentProjectSignup);

router
	.post('/student-project-idea', profile.addProjectIdea)
	.get('/student-project-idea', profile.getProjectIdeaList);

router.post('/send-invitation', fileUpload('uploads').single('file'), counsellor.sendInvitation);
router.get('/counsellor-dashboard', counsellor.counsellorDashboard);

router.post('/addprojecttowatchlist', userProjectController.addToWatchlist);
router.post('/removeprojectfromwatchlist', userProjectController.removeFromWatchlist);
router.post('/CheckProjectAvilableSloat', userProjectController.CheckProjectAvilableSloat);

//mentor routes
router.get('/mentor-dashboard',profile.mentorDashboardNew);

router.post('/create/member', profile.addMembership);

router.get('/mentor-perks', profile.getMentorPerks);
router.post('/addtoFavroriteperk',profile.addtoFavroriteperk);
router.post('/addToFavoriteOpportunities',profile.addToFavoriteOpportunities);

router.post('/create/opportunity', profile.addOpportunity);

router.get('/findopportunities', profile.getOpportunites);

// Home Page Content
router.get('/getHomeContentData',profile.getHomeContentData);

// Mentor Resources
router.post('/getCurrentUserData', profile.getCurrentUserData);
router.post('/fetchSidebarQuetion', profile.fetchSidebarQuetion);
router.post('/getCurrentUserDataFetch', profile.getCurrentUserDataFetch);

router.post('/getMentorUserDataFetch', profile.getMentorUserDataFetch);
router.post('/checkloginpassword', profile.checkloginpassword);

router.post('/getAllMentorUserData', profile.getAllMentorUserData);
router.post('/updateBannerImage', profile.updateBannerImage);

router.post('/choiceUserBannerImage', profile.choiceUserBannerImage);

router.post('/agreegate-terms', profile.getAgreegateInfo);
router.post('/mentor-resource', profile.getMentorResourceInfo);
router.post('/resource-title', profile.getResourceTitle);
router.post('/mentor-article', profile.getMentorArticleInfo);
router.post('/mentor-curated', profile.getMentorCuratedInfo);
router.post('/mentor-file', profile.getMentorFileInfo);
router.post('/add-mentortestimonial', profile.add_mentortestimonial);
router.post('/add-NewHostEvent', profile.add_NewHostEvent);
router.post('/update-HostEvent', profile.update_NewHostEvent);
router.post('/mentor-hostevent', profile.getMentoreventInfo);
router.post('/mentor-hosteventWithid', profile.getMentoreventInfoWithid);
router.post('/mentor-deleteeventWithid', profile.deleteMentoreventInfoWithid);
router.post('/add-ContactCollegey', profile.add_ContactCollegey);

// Admin Mentor Perks
router.post('/mentor-admin-perks', profile.getMentorAdminPerksInfo);
// Admin Collegey Opportunity
router.post('/admin-collegey-opportunity', profile.getMentorAdminCollegeyOpportunitInfo);

module.exports = router;
