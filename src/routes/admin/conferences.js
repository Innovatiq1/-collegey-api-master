const router = require('express').Router();
var conferenceController = require('../../controllers/admin/conferencesController');
import { validateConference } from '../../middleware/validators/userValidations';

router.route('/')
    .get(conferenceController.index)
    .post(validateConference,conferenceController.new)

router.route('/:id')
    .get(conferenceController.view)
    .put(validateConference,conferenceController.edit)
    .delete(conferenceController.delete)

module.exports = router;