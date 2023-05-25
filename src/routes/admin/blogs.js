const router = require('express').Router();
var blogController = require('../../controllers/admin/blogsController');
import { validateBlog } from '../../middleware/validators/userValidations';

router.route('/')
    .get(blogController.index)
    .post(validateBlog,blogController.new)
router.route('/blogtag').post(blogController.blogTag)

router.route('/:id')
    .get(blogController.view)
    .put(validateBlog,blogController.edit)
    .delete(blogController.delete)

module.exports = router;