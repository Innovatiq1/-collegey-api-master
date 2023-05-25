const router = require('express').Router();
var logoController = require('../../controllers/admin/logoController');
import upload from '../../config/multer';

router.route('/')
	.get(logoController.getAllLogos)
	.post(logoController.createLogos)
    
router.route('/all')
    .get(logoController.index)
    
router.route('/:id')
    .get(logoController.view)
    .put(upload.single('file', 1),logoController.edit)
	.patch(logoController.updateLogos)
    .delete(logoController.delete)

router.route('/uploadFile').post(logoController.uploadFile);
router.route('/admin/createGroup').post(logoController.GroupCreate);
router.route('/grouplist').post(logoController.Grouplist);
router.route('/groupDelete/:id').delete(logoController.Groupdelete);
router.route('/groupView/:id').post(logoController.Groupview);
router.route('/groupEdit/:id').put(logoController.Groupedit);
router.route('/requestToJoin/:id').put(logoController.requestJoinMembers);
router.route('/acceptRequestToJoin/:id').put(logoController.acceptTojoin);
// reject to join
router.route('/rejectRequestToJoin/:id').put(logoController.rejectTojoin);

router.route('/updateUploadLogoStatus').post(logoController.updateUploadLogoStatus);

module.exports = router;