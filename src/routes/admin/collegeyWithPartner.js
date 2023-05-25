const router = require('express').Router();

var collegeyWithPartnerController = require('../../controllers/admin/collegeyWithPartnerController');

router.route('/addData').post(collegeyWithPartnerController.addData);

router.route('/getAllData').get(collegeyWithPartnerController.getAllData);

router.route('/updateData/:id').put(collegeyWithPartnerController.updateData);

module.exports = router;
