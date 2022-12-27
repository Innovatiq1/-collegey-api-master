/* eslint-disable node/no-unsupported-features/es-syntax */
import {
	uploadFiles,
	impactPartnersList,
	studentList,
	projectList,
	forgotPassword,
	checkResetPassword,
	resetPassword,
	userListComments,
	uploadAllBannerFiles,
	commentUsers,
} from '../../controllers/common';
import { resetWithOldPassword} from '../../controllers/admin/userController';
import {
	forgotPasswordValidation,
	resetPasswordTokenValidation,
	resetPasswordValidations,
} from '../../middleware/validators/userValidations';

import upload from '../../config/multer';

const router = require('express').Router();

router.post('/upload-files/:source', upload.array('files', 12), uploadFiles);
router.post('/upload-allbanner', upload.array('file', 12), uploadAllBannerFiles);

router.post('/upload-resume/:source', upload.array('files', 12), uploadFiles);
router.get('/impact-partners', impactPartnersList);
router.get('/students', studentList);
router.get('/projects', projectList);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.get('/reset-password/:token', resetPasswordTokenValidation, checkResetPassword);
router.post('/reset-password/:token', resetPasswordValidations, resetPassword);
router.post('/resetOldPassword', resetWithOldPassword);
router.get('/getUserListComments',userListComments);
router.get('/getCommentUsers', commentUsers);
module.exports = router;
