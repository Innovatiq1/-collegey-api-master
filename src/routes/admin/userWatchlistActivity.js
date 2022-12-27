const router = require('express').Router();

const watchListForStudnetController = require('../../controllers/user/watchListForStudentController');

router
	.route('/')
	.get(watchListForStudnetController.getAllWatchlists)
	.post(watchListForStudnetController.createWatchlist);

router
	.route('/:id')
	.get(watchListForStudnetController.getWatchlist)
	.patch(watchListForStudnetController.updateWatchlist)
	.delete(watchListForStudnetController.deleteWatchlist);

router.route('/count/data').get(watchListForStudnetController.getAllWatchlistCounter);

module.exports = router;
