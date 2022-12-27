const router = require('express').Router();

var collegeyAtCareerController = require('../../controllers/admin/collegeyAtCareerController');

router.route('/addData').post(collegeyAtCareerController.addData);

router.route('/getAllData').get(collegeyAtCareerController.getAllData);

router.route('/updateData/:id').put(collegeyAtCareerController.updateData);

module.exports = router;
