const router = require('express').Router();
const investController = require('../../controllers/admin/investController');

router.route('/').get(investController.index);

router.route('/create').post(investController.new);

router.route('/:id').get(investController.view);

module.exports = router;
