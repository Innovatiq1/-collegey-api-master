
import upload from '../../config/multer';
const router = require('express').Router();
var badgeController = require('../../controllers/admin/badgeController')
/* Start Badge Funcationality */
router.route('/').get(badgeController.getAllbadges).post(badgeController.createbadges)
router.route('/all').get(badgeController.index)
router.route('/getActivateBadge').get(badgeController.getActivateBadge);
router.route('/:id')
    .get(badgeController.view)
    .put(upload.single('file', 1),badgeController.edit)
	.patch(badgeController.updatebadges)
    .delete(badgeController.delete)

router.route('/uploadFile').post(badgeController.uploadFile);
router.route('/updateUploadbadgeStatus').post(badgeController.updateUploadbadgeStatus);

/* End Badge Funcationality */
module.exports = router;