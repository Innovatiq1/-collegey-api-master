const router = require('express').Router();
var subscriptionController = require('../../controllers/admin/subscriptionController');

router.route('/')
    .get(subscriptionController.index)

router.route('/create')
    .post(subscriptionController.new)
    
router.route('/:id')
    .get(subscriptionController.view)

module.exports = router;