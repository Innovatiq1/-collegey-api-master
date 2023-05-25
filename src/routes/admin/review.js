const router = require('express').Router();
var reviewController = require('../../controllers/admin/reviewController');

router
	.route('/')
	.get(reviewController.getAllreviews)
	.post(reviewController.createreview)
	.link(reviewController.getAllreviewCounter);

router
	.route('/:id')
	.get(reviewController.getreview)
	.patch(reviewController.updatereview)
	.delete(reviewController.deletereview);

router.post('/updateReviewTestimonialStatus',reviewController.updateReviewTestimonialStatus);
router.post('/add-studenttestimonial', reviewController.add_studenttestimonial);
router.post('/send-collegemsg', reviewController.send_collegemsg);

module.exports = router;
