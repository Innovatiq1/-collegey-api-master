const Newsletter = require('../../models/newsletters');

const factory = require('../factoryFunctions/handlerFactory');

// using default factory functions

exports.getAllNewsletters = factory.getAll(Newsletter);
exports.getAllNewsletterCounter = factory.getAllCounter(Newsletter);
exports.getNewsletter = factory.getOne(Newsletter);
exports.createNewsletter = factory.createOne(Newsletter);
exports.updateNewsletter = factory.updateOne(Newsletter);
exports.deleteNewsletter = factory.deleteOne(Newsletter);
