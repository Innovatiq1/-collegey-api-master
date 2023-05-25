const router = require('express').Router();

const teamController = require('../../controllers/admin/teamController');

router
	.route('/')
	.get(teamController.getAllBoardofAdvisors)
	.post(teamController.createBoardofAdvisor)
	.link(teamController.getAllBoardofAdvisorCounter);

router
	.route('/:id')
	.get(teamController.getBoardofAdvisor)
	.patch(teamController.updateBoardofAdvisor)
	.delete(teamController.deleteBoardofAdvisor);

router.post('/updateBoardofAdvisorsStatus',teamController.updateBoardofAdvisorsStatus);

module.exports = router;
