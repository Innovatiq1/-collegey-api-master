const express = require('express');

const followController = require('../../controllers/user/followController');
const groupController = require('../../controllers/user/groupController');
const watchlistForStudentController = require('../../controllers/user/watchListForStudentController');

const router = express.Router({ mergeParams: true });

// Follow, unfollow and get list of followers and following
router.route('/followUnfollow/:followType/:id').get(followController.followAndUnfollow);
//get list of groups woth user_id
router.route('/group').get(groupController.groupOfMembers);
router.route('/allGroupList').post(groupController.all_GroupList);

// Group follow, unfollow and get list of users in a group
router.route('/group/:followType/:id').get(groupController.groupfollowAndUnfollow);

router.route('/groups/future').post(groupController.futureSelf);


// Create Group
router.route('/createGroup').post(groupController.createGroup);
router.route('/editGroupData').post(groupController.editGroupData);
router.route('/deleteFeedsGroup').post(groupController.deleteFeedsGroup);

// get each Group
router.route('/eachGroup/:id').get(groupController.getEachGroup);

// add users
router.route('/updateGroupMembers/:id').put(groupController.groupMembersUpdate);

// request to join
router.route('/requestToJoin/:id').put(groupController.requestJoinMembers);
// accept to join
router.route('/acceptRequestToJoin/:id').put(groupController.acceptTojoin);
// reject to join
router.route('/rejectRequestToJoin/:id').put(groupController.rejectTojoin);

// add and remove From Watchlist
router.route('/watchlist/:watchlist/:id').get(watchlistForStudentController.watchlistAddOrRemove);

module.exports = router;
