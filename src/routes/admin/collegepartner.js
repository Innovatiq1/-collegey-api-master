const router = require('express').Router();
var colleagePartnerController = require('../../controllers/admin/collegeyPartnerController');
import { validateBlog } from '../../middleware/validators/userValidations';
import upload from '../../config/multer';

router.route('/')
    .get(colleagePartnerController.index)

router.route('/fetch_all')
    .get(colleagePartnerController.fetch_all)

router.route('/create').post(colleagePartnerController.new);
    //.post(colleageFundController.new)

// router.route('/:id')
//     .get(collegelogoController.view)
//     .put(upload.single('file', 1),collegelogoController.edit)
//     .delete(collegelogoController.delete)
//router.route('/uploadFile').post(upload.single('file', 1), collegelogoController.uploadFile);

module.exports = router;