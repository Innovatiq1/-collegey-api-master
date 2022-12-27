const router = require('express').Router();
import sanatizeUserType from '../../middleware/sanatizeUserType';
import {
	RegisterOrCreateUserValidation,
	ProfileUpdateValidation,
	UserEditValidation,
} from '../../middleware/validators/userValidations';
import upload from '../../config/multer';

var userController = require('../../controllers/admin/userController');

router
	.route('/:type')
	.get(sanatizeUserType, userController.index)
	.post(
		sanatizeUserType,
		upload.single('avatar'),
		RegisterOrCreateUserValidation,
		userController.new
	);

router
	.route('/usersByName')
	.post(userController.getUserByName)

router
	.route('/:type/:id')
	.get(sanatizeUserType, userController.view)
	.put(sanatizeUserType, UserEditValidation, userController.edit)
	.delete(userController.delete);

router
	.route('/profile/:type/:id')
	.put(sanatizeUserType, ProfileUpdateValidation, userController.profileEdit)
	.get(sanatizeUserType, userController.getProfile);

// Export API routes
module.exports = router;
