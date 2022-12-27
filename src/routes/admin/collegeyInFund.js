const router = require('express').Router();

var collegeyInFundController = require('../../controllers/admin/collegeyInFundController');

router.route('/addData').post(collegeyInFundController.addData);

router.route('/getAllData').get(collegeyInFundController.getAllData);

router.route('/updateData/:id').put(collegeyInFundController.updateData);

module.exports = router;
