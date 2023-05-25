const router = require('express').Router();

const groupController = require('../../controllers/user/groupController');

router
	.route('/')
	.get(groupController.getAllGroups)
	.post(groupController.createGroup);

router
	.route('/:id')
	.get(groupController.getGroup)
	.patch(groupController.updateGroup)
	.delete(groupController.deleteGroup);

router.route('/count/data').get(groupController.getAllGroupCounter);

module.exports = router;
