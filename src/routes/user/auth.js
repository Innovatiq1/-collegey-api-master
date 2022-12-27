/* eslint-disable node/no-unsupported-features/es-syntax */
const router = require('express').Router();
const auth = require('../../controllers/auth');

import sanatizeUserType from '../../middleware/sanatizeUserType';
import {
	RegisterOrCreateUserValidation,
	validateLogin,
	UserEditValidation,
} from '../../middleware/validators/userValidations';

router.post('/login', validateLogin, auth.login);
router.post('/social-login', auth.socialLogin);
router.post('/logout', auth.logout);
router.post('/register', sanatizeUserType, RegisterOrCreateUserValidation, auth.signup);
router.put('/edit', sanatizeUserType, UserEditValidation, auth.edit);
router.get('/me', sanatizeUserType, auth.profile);

// Linkedin in Social Login Access Token
router.route('/getLinkedinAccessToken').post(auth.getLinkedinAccessToken); 
router.route('/getLinkedinDetailsFetch').post(auth.getLinkedinDetailsFetch);

module.exports = router;
