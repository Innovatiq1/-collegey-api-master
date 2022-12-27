const router = require('express').Router();

var collegeyInvestInController = require('../../controllers/admin/collegeyInvestInController');

router.route('/addData').post(collegeyInvestInController.addData);

router.route('/getAllData').get(collegeyInvestInController.getAllData);

router.route('/updateData/:id').put(collegeyInvestInController.updateData);

module.exports = router;
