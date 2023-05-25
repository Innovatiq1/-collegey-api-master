const Chat = require('../../models/chats');

const factory = require('../factoryFunctions/handlerFactory');

// using default factory functions

exports.getAllChats = factory.getAll(Chat);
exports.getAllChatCounter = factory.getAllCounter(Chat);
exports.getChat = factory.getOne(Chat);
exports.createChat = factory.createOne(Chat);
exports.updateChat = factory.updateOne(Chat);
exports.deleteChat = factory.deleteOne(Chat);
