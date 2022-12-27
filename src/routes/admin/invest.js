const router = require('express').Router();
var investController = require('../../controllers/admin/investController');

router.route('/')
    .get(investController.index)

router.route('/fetch_all')
    .get(investController.fetch_all)

router.route('/create')
    .post(investController.new)
    
router.route('/:id')
    .get(investController.view)

module.exports = router;