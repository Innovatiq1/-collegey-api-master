const router = require('express').Router();

const followController = require('../../controllers/admin/followController');

router
	.route('/')
	.get(followController.getAllFollows)
	.post(followController.createFollow);

router
	.route('/:id')
	.get(followController.getFollow)
	.patch(followController.updateFollow)
	.delete(followController.deleteFollow);

router.route('/count/data').get(followController.getAllFollowCounter);

module.exports = router;
