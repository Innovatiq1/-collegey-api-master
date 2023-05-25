const router = require('express').Router();

const AnnouncementController = require('../../controllers/user/announcementController');

router
	.route('/getAnnouncementByUserType')
	.post(AnnouncementController.getAllAnnouncements)

module.exports = router;