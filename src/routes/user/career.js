/* eslint-disable node/no-unsupported-features/es-syntax */
import { validateBlog } from '../../middleware/validators/userValidations';

const router = require('express').Router();
const careerController = require('../../controllers/admin/careerController');

router.route('/').get(careerController.index);

router.route('/create').post(careerController.new);

router.route('/:id').get(careerController.view);

module.exports = router;
