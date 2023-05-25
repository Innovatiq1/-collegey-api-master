const router = require('express').Router();

const collegeyFeedController = require('../../controllers/user/collegeyFeedController');
const collegeyFeedController1 = require('../../controllers/admin/collegeyFeedController');

router
	.route('/')
	.get(collegeyFeedController1.getAllCollegeyFeeds)
	//.put(collegeyFeedController1.updateFeedPost)
	// .post(collegeyFeedController.createCollegeyFeed);

router
	.route('/:id')
	// .get(collegeyFeedController.getCollegeyFeed)
	// .patch(collegeyFeedController.updateCollegeyFeed)
	.delete(collegeyFeedController.deleteCollegeyFeed);

router
	.route('/updateFeedStatus')
	.post(collegeyFeedController1.updateCollegeyFeed1);


router
	.route('/updateFeedPost')
	.put(collegeyFeedController1.updateFeedPost);

router
	.route('/addAcademy')
	.post(collegeyFeedController1.add_AcedamicBoxData);

router
	.route('/getAcademy')
	.get(collegeyFeedController1.get_AcedamicBoxData);

router
	.route('/updateAcademy/:id')
	.put(collegeyFeedController1.update_AcedamicBoxData);

//collegey Question
router
	.route('/addQuestion')
	.post(collegeyFeedController1.add_collegeyQuestionData);

router
	.route('/getQuestion')
	.get(collegeyFeedController1.get_collegeyQuestionData);
	
router
	.route('/getMasterQuestion')
	.get(collegeyFeedController1.get_collegeyMasterQuestion);

router
	.route('/updateQuestion/:id')
	.put(collegeyFeedController1.update_collegeyQuestionData);

router
	.route('/getAnswer')
	.post(collegeyFeedController1.get_collegeyAnswerData);	


module.exports = router;
