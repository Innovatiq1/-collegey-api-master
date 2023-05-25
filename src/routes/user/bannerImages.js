const router = require('express').Router();
var bannerImage = require('../../controllers/user/bannerImage');

router.route('/getBanners')
    .post(bannerImage.getBannerByUser)

module.exports = router;