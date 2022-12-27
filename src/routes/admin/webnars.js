const router = require('express').Router();
var webinarController = require('../../controllers/admin/webinarsController');
import { validateWebinar } from '../../middleware/validators/userValidations';
router.route('/')
    .get(webinarController.index)
    .post(validateWebinar,webinarController.new)

router.route('/:id')
    .get(webinarController.view)
    .put(validateWebinar,webinarController.edit)
    .delete(webinarController.delete)

module.exports = router;