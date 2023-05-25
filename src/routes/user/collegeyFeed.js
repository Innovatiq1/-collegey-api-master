const router = require('express').Router();

const collegeyFeedController = require('../../controllers/user/collegeyFeedController');
const feedComment = require('./feedComment');

const AppError = require('../../utils/appError');

// Auth Check and Restriction checking
router.use(function(req, res, next) {
	const roles = ['student', 'admin'];
	// roles ['admin', 'user']. role='user'
	if (!roles.includes(req.user.type)) {
		return next(new AppError('You do not have permission to perform this action', 403));
	}

	if (req.user.type === 'student' && req.method === 'POST') {
		req.body.user = req.user._id;
	}

	next();
});

/*-----------------------------------------------------
 *  Login user:  --- All path below ------------------
 * '{{url}}/x-api/v1/user/collegeyFeed/* paths
 *
 */

router
	.route('/')
	.post(collegeyFeedController.getAllCollegeyFeeds)
	.post(collegeyFeedController.createCollegeyFeed);

router
	.route('/:id')
	.get(collegeyFeedController.getCollegeyFeed)
	.patch(collegeyFeedController.updateCollegeyFeed)
	.delete(collegeyFeedController.deleteCollegeyFeed);

// delete post by id
router.route('/deletePostById').post(collegeyFeedController.deleteFeedById);

// Add Feed Post By Url
router.route('/addNewFeedPost').post(collegeyFeedController.addNewFeedPost);
router.route('/updateFeedPost').post(collegeyFeedController.updateFeedPost);
router.route('/addNewGroupFeedPost').post(collegeyFeedController.addNewGroupFeedPost);

// Edit Comment and delete Feeds Comment
router.route('/updateFeedComment').post(collegeyFeedController.updateFeedComment);
router.route('/removeFeedComment').post(collegeyFeedController.removeFeedComment);

router.route('/count/data').get(collegeyFeedController.getAllCollegeyFeedCounter);

// router.route('/groupWiseData/:_id').get(collegeyFeedController.getGroupwiseFeed);
router.route('/groupWiseData').post(collegeyFeedController.getGroupwiseFeed);
router.route('/postComment/:id').post(collegeyFeedController.createCommentForFeed);
router.route('/like/:id').post(collegeyFeedController.liketForFeed);
router.route('/dislike/:id').put(collegeyFeedController.DisliketForFeed);
router.route('/share/:id').post(collegeyFeedController.shareForFeed);

router.use('/', feedComment);

module.exports = router;
