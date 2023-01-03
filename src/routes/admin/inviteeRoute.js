const router = require('express').Router();
var inviteeController = require('../../controllers/admin/inviteeController');

router.route('/')
    .get(inviteeController.index)
    .post(inviteeController.new)

router.route('/joininvitee')
    .get(inviteeController.view_join)
    .post(inviteeController.new_join)

router.route('/joininvitee/:id')
    .get(inviteeController.view_singleJoin)
    .put(inviteeController.edit_invitejoin)
    .delete(inviteeController.delete_invitejoin)
    
router.route('/bulk')
    .post(inviteeController.bulk)

router.route('/:id')
    .get(inviteeController.view)
    .put(inviteeController.edit)
    .delete(inviteeController.delete)

router.route('/joininvitee/activate/:id').post(inviteeController.activationInviteCode);
router.route('/joininvitee/reject/:id').post(inviteeController.sendinviteJoinRejected);

router.route('/activate/:id')
    .post(inviteeController.activationCode);

// active-inactive route

router.route('/active')
    .post(inviteeController.activeInvitee);

router.route('/joininvitee/active')
    .post(inviteeController.activeInviteJoin);

module.exports = router;