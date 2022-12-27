
const router = require('express').Router();
var assignBadgeController = require('../../controllers/admin/assignBadgeController')
/* Start Assign Badge Funcationality */
router.route('/').get(assignBadgeController.getAllAssignBadge).post(assignBadgeController.createAssignedBadge)
router.route('/:id')  
	.patch(assignBadgeController.updateAssignBadge)
    .delete(assignBadgeController.delete)

router.route('/all').get(assignBadgeController.index);
router.route('/getActivateBadge').get(assignBadgeController.getActivateAssignBadge); 
router.route('/updateAssignBadgeStatus').post(assignBadgeController.updateAssignBadgeStatus);
router.route('/badgeList/').post(assignBadgeController.getAssignedBadgeList);
/* End Assign Badge Funcationality */ 

module.exports = router;