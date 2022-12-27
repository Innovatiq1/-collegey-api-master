const router = require('express').Router();
const inviteeController = require('../../controllers/user/inviteeController');

router.route('/').post(inviteeController.new);

router.route('/activate').post(inviteeController.activate);
router.route('/fetchrefral').post(inviteeController.view_memberRefral); 

router.route('/sendInvite').post(inviteeController.send);


module.exports = router;
