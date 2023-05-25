const router = require('express').Router();

const NewsletterController = require('../../controllers/admin/newsletterController');

router
	.route('/')
	.get(NewsletterController.getAllNewsletters)
	.post(NewsletterController.createNewsletter);

router
	.route('/:id')
	.get(NewsletterController.getNewsletter)
	.patch(NewsletterController.updateNewsletter)
	.delete(NewsletterController.deleteNewsletter);

router.route('/count/data').get(NewsletterController.getAllNewsletterCounter);

module.exports = router;
