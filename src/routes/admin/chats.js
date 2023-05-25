const router = require('express').Router();

const ChatController = require('../../controllers/admin/chatController');

router
	.route('/')
	.get(ChatController.getAllChats)
	.post(ChatController.createChat);

router
	.route('/:id')
	.get(ChatController.getChat)
	.patch(ChatController.updateChat)
	.delete(ChatController.deleteChat);

router.route('/count/data').get(ChatController.getAllChatCounter);

module.exports = router;
