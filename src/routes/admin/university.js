const router = require('express').Router();
var university = require('../../controllers/admin/university');

router.route('/addUniversity')
    .post(university.addUniversity)

router.route('/getUniversity')
    .get(university.getUniversity)


router.route('/removeBannerImage').post(university.removeBannerImage);

router.route('/universityList')
    .get(university.getUniversityList)

router.route('/:id')
    .put(university.updateUniversity)
    .delete(university.deleteUniversity)
    .get(university.getUniversity)

module.exports = router;