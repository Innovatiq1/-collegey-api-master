const router = require('express').Router();

const meetOurTeamController = require('../../controllers/user/meetOurTeamController');

router
	.route('/getTitle')
	.get(meetOurTeamController.getAllTitle)
	//.put(collegeyFeedController1.updateFeedPost)
	// .post(collegeyFeedController.createCollegeyFeed);

router
	.route('/addTitle')
	.post(meetOurTeamController.addTitleData);

router
	.route('/updateTitle/:id')
	.put(meetOurTeamController.updateTitle);

module.exports = router;
