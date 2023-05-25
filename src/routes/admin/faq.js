const router = require('express').Router();

const faqController = require('../../controllers/admin/faqController');

router
	.route('/')
	.get(faqController.getAllfaqs)
	.post(faqController.createfaq)	
	.link(faqController.getAllfaqCounter);

router
	.route('/faqCategory')
	.post(faqController.createCategory)
	.get(faqController.getCategory)

router
	.route('/editFaqCategory')
	.post(faqController.editCategory)

router
	.route('/:id')
	.get(faqController.getfaq)
	.patch(faqController.updatefaq)
	.delete(faqController.deletefaq);

router.post('/activationFaqsStatus',faqController.activationFaqsStatus);

module.exports = router;
