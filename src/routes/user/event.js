const router = require('express').Router();

const eventController = require('../../controllers/user/eventController');

router
	.route('/')	
	.post(eventController.createEvent);

router
	.route('/eventData')
	.post(eventController.getAllEvents)
router
	.route('/updateEvent')
	.post(eventController.studentUpdateEvents)

router
	.route('/eventDataByMonth')
	.post(eventController.getEventsByMonth)

router
	.route('/eventDataByUser')
	.post(eventController.getEventsByUser)

router
	.route('/:id')
	.get(eventController.getEvent)
	.patch(eventController.updateEvent)
	.delete(eventController.deleteEvent);

router.route('/count/data').get(eventController.getAllEventCounter);
router.route('/attend').post(eventController.postattendEvent);

router.route('/Follower').post(eventController.postMentorFollow);
router.route('/UnFollower').post(eventController.postUnFollower);
router.route('/univerCityFollower').post(eventController.postUniverCiyFollow);
router.route('/user').get(eventController.postUser);

module.exports = router;
