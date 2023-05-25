const router = require('express').Router();
var courseController = require('../../controllers/admin/courseController');
import { validateCourse } from '../../middleware/validators/userValidations';
router.route('/')
    .get(courseController.index)
    .post(validateCourse,courseController.new)

router.route('/:id')
    .get(courseController.view)
    .put(validateCourse,courseController.edit)
    .delete(courseController.delete)

module.exports = router;