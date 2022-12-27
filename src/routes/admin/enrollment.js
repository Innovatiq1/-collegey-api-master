const router = require('express').Router();
var enrollmentController = require('../../controllers/admin/enrollmentController');

router.route('/')
    .get(enrollmentController.index)
    .post(enrollmentController.new)

router.route('/:id')
    .get(enrollmentController.view)
    .put(enrollmentController.edit)
    .delete(enrollmentController.delete)


module.exports = router;