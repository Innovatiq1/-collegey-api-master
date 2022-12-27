const router = require('express').Router();

const teamController = require('../../controllers/admin/teamController');

router
	.route('/')
	.get(teamController.getAllBoardofDirectors)
	.post(teamController.createBoardofDirector)
	.link(teamController.getAllBoardofDirectorCounter);

router
	.route('/:id')
	.get(teamController.getBoardofDirector)
	.patch(teamController.updateBoardofDirector)
	.delete(teamController.deleteBoardofDirector);

router.post('/updateBoardofDirectorsStatus',teamController.updateBoardofDirectorsStatus);

module.exports = router;
