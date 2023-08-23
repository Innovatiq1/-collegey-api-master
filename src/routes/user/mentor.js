const router = require('express').Router();
const mentorSerivce = require('../../controllers/user/mentorController');
const mentorController = require('../../services/mentorServices');

// router.post('createMentor', mentorSerivce.create);
// router.get('createMentor', mentorSerivce.getMentors);
router.route('/getMentor').get(mentorSerivce.getMentors);
router.route('/createMentor').post(mentorSerivce.addMentor);
router.route('/getUniversities').get(mentorSerivce.getUniv);
router.route('/createUniversities').post(mentorSerivce.addUniv);
router.route('/getUser').get(mentorSerivce.getUser);
router.route('/getUniversity').get(mentorSerivce.getUniversity);

module.exports = router;


