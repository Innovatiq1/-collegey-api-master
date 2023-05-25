const router = require('express').Router();
const ChatController = require('../../controllers/user/studentchatContorller');

// Get user
router.post('/userList', ChatController.list_allUser);
router.post('/userListletes', ChatController.list_allUserletest);
router.post('/addChatnewmsg', ChatController.add_Chatnewmsg);
router.post('/fetchChatnewmsg', ChatController.fetch_Chatnewmsg);

module.exports = router;
