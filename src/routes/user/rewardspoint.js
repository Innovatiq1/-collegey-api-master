const router = require('express').Router();
const RewardspointController = require('../../controllers/user/rewardspointController');

router.route('/').get(RewardspointController.getActivateRewardMasters);
router.route('/create').post(RewardspointController.createRewardMasters);

router.route('/checkCount').post(RewardspointController.checkRewardPoints);
router.route('/addNewRewardPoints').post(RewardspointController.addNewRewardPoint); 
router.route('/minusRewardPoints').post(RewardspointController.deleteRewardPoint); 
router.route('/updateProfileRewardPoints').post(RewardspointController.updateProfileRewardPoints);
router.route('/getRewardPointsByname').post(RewardspointController.getRewardPointsByname);

router.route('/userRewardPoints').post(RewardspointController.userRewardPoints);


module.exports = router;
