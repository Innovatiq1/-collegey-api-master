const router = require('express').Router();
const {
	commentGetServices,
	commentPostServices,
	commentDeleteServices,
} = require('../../controllers/feedComment');

// id is feedID
router
	.route('/:id/comment')
	.get(commentGetServices.getAll)
	.post(commentPostServices.createOne);

router.route('/:id/comment/:commentId').delete(commentDeleteServices.deleteOne);

module.exports = router;
