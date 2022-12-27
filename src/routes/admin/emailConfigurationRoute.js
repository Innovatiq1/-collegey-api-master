const router = require('express').Router();
var emailController = require('../../controllers/admin/email-configuration/emailConfigurationController');

router.post('/addForgetPasswordTemplate',emailController.addForgetPasswordTemplate);
router.get('/getForgetPasswordTemplate',emailController.getForgetPasswordTemplate);
router.post('/updateForgetPasswordTemplate',emailController.updateForgetPasswordTemplate);

module.exports = router;