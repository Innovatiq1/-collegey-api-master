const router = require('express').Router();
var privacyController = require('../../controllers/admin/privacyController');
import { validateBlog } from '../../middleware/validators/userValidations';

router.route('/')
    .get(privacyController.index)
    .post(privacyController.new)

router.route('/:id')
    .get(privacyController.view)
    .put(privacyController.edit)
    .delete(privacyController.delete)

module.exports = router;