const router = require('express').Router();
var universitylogoController = require('../../controllers/admin/universityLogoController');
import upload from '../../config/multer';


router.route('/')
	.get(universitylogoController.getAllUniversityLogos)
	.post(universitylogoController.createUniversityLogos)
    
router.route('/all')
    .get(universitylogoController.index)
    
router.route('/:id')
    .get(universitylogoController.view)
    .put(upload.single('file', 1),universitylogoController.edit)
	.patch(universitylogoController.updateUniversityLogos)
    .delete(universitylogoController.delete)

router.route('/uploadFile').post(universitylogoController.uploadFile);
router.route('/updateUploadUniversityLogoStatus').post(universitylogoController.updateUploadUniversityLogoStatus);
router.route('/file').post(universitylogoController.fileDownload);
router.route('/mentorfile').post(universitylogoController.fileDownloadMentor);

module.exports = router;