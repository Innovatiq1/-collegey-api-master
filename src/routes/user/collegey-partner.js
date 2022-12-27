const router = require('express').Router();
const collegeyPartnerController = require('../../controllers/admin/collegeyPartnerController');

// router.route('/').get(investController.index);

router.route('/create').post(collegeyPartnerController.new);

// router.route('/:id').get(investController.view);

module.exports = router;
