const router = require('express').Router();
const subscriptionController = require('../../controllers/admin/subscriptionController');

router.route('/').get(subscriptionController.index);

router.route('/create').post(subscriptionController.new);

router.route('/:id').get(subscriptionController.view);

router.post('/newsLetter', subscriptionController.createNewsLetter);

router.post('/newsLetterList', subscriptionController.listNewsLetter);

router.post('/csv', subscriptionController.csvData);

module.exports = router;
