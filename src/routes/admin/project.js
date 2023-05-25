const router = require('express').Router();

const ProjectController = require('../../controllers/admin/projectController');

router
	.route('/')
	.get(ProjectController.getAllProjects)
	.post(ProjectController.getUserIdToProjectOwner, ProjectController.createProject);

router.route('/fetchproject').post(ProjectController.fetchAllProjects);

router
	.route('/:id')
	.get(ProjectController.getProject)
	.patch(ProjectController.updateProject)
	.delete(ProjectController.deleteProject);

router.route('/count/data').get(ProjectController.getAllProjectCounter);

module.exports = router;
