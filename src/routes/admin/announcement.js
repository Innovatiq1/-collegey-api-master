const router = require('express').Router();

const AnnouncementController = require('../../controllers/admin/announcementController');
const factory = require('../../controllers/factoryFunctions/handlerFactory');

router
	.route('/')
	.get(AnnouncementController.getAllAnnouncements)
	.post(factory.getMe('announcementBy'), AnnouncementController.createAnnouncement);

router
	.route('/:id')
	.get(AnnouncementController.getAnnouncement)
	.patch(AnnouncementController.updateAnnouncement)
	.delete(AnnouncementController.deleteAnnouncement);

router.route('/count/data').get(AnnouncementController.getAllAnnouncementCounter);

module.exports = router;
