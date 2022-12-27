const router = require('express').Router();
var collegelogoController = require('../../controllers/admin/collegeLogoController')
import upload from '../../config/multer';

router.route('/')
	.get(collegelogoController.getAllCollegeLogos)
	.post(collegelogoController.createCollegeLogos)
    
router.route('/all')
    .get(collegelogoController.index)
    
router.route('/:id')
    .get(collegelogoController.view)
    .put(upload.single('file', 1),collegelogoController.edit)
	.patch(collegelogoController.updateCollegeLogos)
    .delete(collegelogoController.delete)

router.route('/uploadFile').post(collegelogoController.uploadFile);
router.route('/updateUploadCollegeLogoStatus').post(collegelogoController.updateUploadCollegeLogoStatus);

module.exports = router;