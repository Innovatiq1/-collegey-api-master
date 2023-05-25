const router = require('express').Router();
var progarmController = require('../../controllers/admin/programsController');
import { validateProgram } from '../../middleware/validators/userValidations';
router.route('/')
    .get(progarmController.index)
    .post(validateProgram,progarmController.new)

router.route('/:id')
    .get(progarmController.view)
    .put(validateProgram,progarmController.edit)
    .delete(progarmController.delete)

router.post('/getProgramByName',progarmController.getProgramByName);

module.exports = router;