const router = require('express').Router();
var bannerImage = require('../../controllers/admin/bannerImage');

router.route('/addBanner')
    .post(bannerImage.addBanner)

router.route('/removeBannerImage').post(bannerImage.removeBannerImage);

router.route('/:bannerFor')
    .get(bannerImage.getBannerByUse)

router.route('/:id')
    .put(bannerImage.updateBanner)
    .delete(bannerImage.deleteBanner)

module.exports = router;