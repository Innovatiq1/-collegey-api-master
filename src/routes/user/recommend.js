const router = require('express').Router();
const recommend = require('../../controllers/user/recommend');
router
    .route('/')
    .post(recommend.send)
    .get(recommend.getRecommend);

module.exports = router;

