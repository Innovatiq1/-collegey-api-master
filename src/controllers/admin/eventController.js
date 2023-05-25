const Event = require('../../models/Event');

const factory = require('../factoryFunctions/handlerFactory');

// using default factory functions

exports.getAllEvents = factory.getAll(Event);
exports.getAllEventCounter = factory.getAllCounter(Event);
exports.getEvent = factory.getOne(Event);
exports.createEvent = factory.createOne(Event);
exports.updateEvent = factory.updateOne(Event);
exports.deleteEvent = factory.deleteOne(Event);
