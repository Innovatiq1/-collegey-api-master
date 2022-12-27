const router = require('express').Router();
const resources = require('../../controllers/user/resourcesController');
var blogController = require('../../controllers/admin/blogsController');

router.get('/blogs', resources.getBlogs);
router.post('/blogtag', resources.blogTag);
router.get('/blogs/:slug', resources.getBlogDetails);
router.get('/webinars', resources.getWebinars);
router.get('/programs', resources.getPrograms);
router.get('/programs/:id', resources.getProgramsDetails);


router.get('/courses', resources.getCourses);
router.get('/conferences', resources.getConferences);
router.get('/get-all', resources.getAllResources);

// Blog Comment Api
router.post('/add-blogComment', resources.add_blogComment);
router.post('/add-reply', resources.add_CommentReply);
router.post('/getBlogComment', resources.getBlogComment);
// router.post('/getCommentReply', resources.getCommentReply);

// News & Resources Data
router.post('/getNewsResourcesData', resources.getNewsResourcesData);
router.post('/getNewsArticle', resources.getNewsArticle);
router.post('/getStudentCurated', resources.getStudentCurated);
router.post('/getStudentFileData', resources.getStudentFileData);
router.post('/getSearchPostData', resources.getSearchPostData);

module.exports = router;
