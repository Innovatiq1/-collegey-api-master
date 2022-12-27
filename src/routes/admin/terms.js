const router = require('express').Router();
var termsController = require('../../controllers/admin/termsController');
import { validateBlog } from '../../middleware/validators/userValidations';

router.route('/')
    .get(termsController.index)
    .post(termsController.new)

router.route('/:id')
    .get(termsController.view)
    .put(termsController.edit)
    .delete(termsController.delete)

module.exports = router;