const router = require('express').Router();
const assignBadgeController = require('../../controllers/admin/assignBadgeController');

router.route('/').get(assignBadgeController.index);
router.route('/badgeList/').post(assignBadgeController.getAssignedBadgeList);
module.exports = router;
