const router = require('express').Router();
var colleageFundController = require('../../controllers/admin/colleageFundController');
import { validateBlog } from '../../middleware/validators/userValidations';
import upload from '../../config/multer';

router.route('/')
    .get(colleageFundController.index)
router.route('/create').post(colleageFundController.new);

    //.post(colleageFundController.new)

// router.route('/:id')
//     .get(collegelogoController.view)
//     .put(upload.single('file', 1),collegelogoController.edit)
//     .delete(collegelogoController.delete)
//router.route('/uploadFile').post(upload.single('file', 1), collegelogoController.uploadFile);

module.exports = router;