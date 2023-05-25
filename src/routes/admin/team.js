const router = require('express').Router();

const teamController = require('../../controllers/admin/teamController');

router
	.route('/')
	.get(teamController.getAllTeams)
	.post(teamController.createTeam)
	.link(teamController.getAllTeamCounter);

router
	.route('/:id')
	.get(teamController.getTeam)
	.patch(teamController.updateTeam)
	.delete(teamController.deleteTeam);

router.post('/updateTeamMemberStatus',teamController.updateTeamMemberStatus);

module.exports = router;
