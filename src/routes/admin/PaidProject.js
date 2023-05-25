const router = require('express').Router();

const PaidProjectController = require('../../controllers/admin/paidProjectsController');

router
	.route('/')
	.get(PaidProjectController.getAllPaidProjects)
	.post(PaidProjectController.createPaidProject);

router
	.route('/:id')
	.get(PaidProjectController.getPaidProject)
	.patch(PaidProjectController.updatePaidProject)
	.delete(PaidProjectController.deletePaidProject);

router.route('/count/data').get(PaidProjectController.getAllPaidProjectCounter);

module.exports = router;
