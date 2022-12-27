const router = require('express').Router();

const ProjectDashboardController = require('../../controllers/user/projectDashboardContorller');
// upload s3 Function
const { uploadPrivate } = require('../../config/multer');


router
	.route('/')
	//.get(ProjectDashboardController.getAllUserProjects)
	.post(ProjectDashboardController.getAllUserProjects);
	// .post(ProjectController.getUserIdToProjectOwner, ProjectController.createProject);
router.route('/getAllPendingProjectByStudent').post(ProjectDashboardController.getAllPendingProjectByStudent);
router
	.route('/:id')
	.get(ProjectDashboardController.getProjectDetails);
	// .patch(ProjectController.updateProject)
	// .delete(ProjectController.deleteProject);
router
	.route('/chat/:id')
	.get(ProjectDashboardController.getProjectChats)
	.post(ProjectDashboardController.postProjectChat);

router
	.route('/programchat/:id')
	.get(ProjectDashboardController.getProgramChats)
	.post(ProjectDashboardController.postProgramChat);


router.route('/invitee').post(ProjectDashboardController.getProjetsInvitee);
router.route('/inviteeProgram').post(ProjectDashboardController.getProgramInvitee);
router.route('/interests').post(ProjectDashboardController.getProjetsInterests);
router.route('/subjects').post(ProjectDashboardController.postProjetsSubject);
router.route('/outcomes').post(ProjectDashboardController.postProjetsOutcome);
router.route('/subjectsList').post(ProjectDashboardController.postProjetsSubjectList);
router.route('/outcomesList').post(ProjectDashboardController.projectOutcomeList);

router.route('/interestList').post(ProjectDashboardController.getProjetsInterestsList);
router.route('/addNewProject').post(ProjectDashboardController.postNewProject);
router.route('/deleteProjectPost').post(ProjectDashboardController.deleteProjectPost);
router.route('/progamesList').post(ProjectDashboardController.progamesList);
router.route('/completedprogamesList').post(ProjectDashboardController.completedprogamesList);

router.route('/addNewProjectPost').post(ProjectDashboardController.postNewProjectPost);
router.route('/updateProjectPost').post(ProjectDashboardController.updateProjectPost);

router.route('/addNewProgramPost').post(ProjectDashboardController.postNewProgramPost);
router.route('/getProgram/:id').get(ProjectDashboardController.programlist);
router.route('/updateProgramPost').post(ProjectDashboardController.updateProgramPost);
router.route('/deleteProgramPost').post(ProjectDashboardController.deleteProgramPost);



router.route('/addNewProjectPostLike').post(ProjectDashboardController.addNewProjectPostLike);
router.route('/RemoveProjectEvent').post(ProjectDashboardController.RemoveProjectEvent);

// Project Payment
router.route('/payForpaidProject').post(ProjectDashboardController.payForpaidProject);

router.route('/addNewProjectEvent').post(ProjectDashboardController.postNewProjectEvent);
router.route('/fetchrefralProject').post(ProjectDashboardController.postproject);
router.route('/getmentor').post(ProjectDashboardController.getMentor);
router.route('/EditNewProjectEvent').post(ProjectDashboardController.EditNewProjectEvent);
router.route('/UserProjectSuccess').post(ProjectDashboardController.UserProjectSuccess);
router.route('/updateProjectPaymentStatus').post(ProjectDashboardController.updateProjectPaymentStatus);

// Program Success
router.route('/UserProgramSuccess').post(ProjectDashboardController.UserProgramSuccess);

router.route('/delFileById').post(ProjectDashboardController.deleteProjectFiles)

router.route('/program/delFileById').post(ProjectDashboardController.deleteProgramFiles)

router
	.route('/chat/file/:id')
	.post(uploadPrivate.single('file',1),ProjectDashboardController.postProjectChatFile);


router
	.route('/file/:id')
	.get(ProjectDashboardController.getProjectFiles)
	.post(uploadPrivate.single('file',1),ProjectDashboardController.postProjectFiles);




	router
	.route('/file/program/:id')
	.get(ProjectDashboardController.getProgramFiles)
	.post(uploadPrivate.single('file',1),ProjectDashboardController.postProgrmFiles);

router.route('/addNewProgramEvent').post(ProjectDashboardController.postNewProgramEvent);
router.route('/EditNewProgramEvent').post(ProjectDashboardController.EditNewProgramEvent);
router.route('/RemoveProgramEvent').post(ProjectDashboardController.RemoveProgramEvent);

// router.route('/count/data').get(ProjectController.getAllProjectCounter);

router
	.route('/feed/:id')
	.get(ProjectDashboardController.getProjectFeeds)

module.exports = router;
