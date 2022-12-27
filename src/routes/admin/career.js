const router = require('express').Router();
var careerController = require('../../controllers/admin/careerController');
import { validateBlog } from '../../middleware/validators/userValidations';

router.route('/')
    .get(careerController.index)
router.route('/fetch_all')
    .get(careerController.fetch_all)

router.route('/create')
    .post(careerController.new)
    
router.route('/:id')
    .get(careerController.view)

module.exports = router;