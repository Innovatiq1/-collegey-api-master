const router = require('express').Router();

const eventController = require('../../controllers/admin/eventController');

router
	.route('/')
	.get(eventController.getAllEvents)
	.post(eventController.createEvent)
	.link(eventController.getAllEventCounter);

router
	.route('/:id')
	.get(eventController.getEvent)
	.patch(eventController.updateEvent)
	.delete(eventController.deleteEvent);

module.exports = router;
