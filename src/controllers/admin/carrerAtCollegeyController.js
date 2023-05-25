const careersAtCollegey = require('../../models/careersAtCollegey');

const factory = require('../factoryFunctions/handlerFactory');

// using default factory functions

exports.getAllCareers = factory.getAll(careersAtCollegey);
exports.getAllCareerCounter = factory.getAllCounter(careersAtCollegey);
exports.getCareer = factory.getOne(careersAtCollegey);
exports.createCareer = factory.createOne(careersAtCollegey);
exports.updateCareer = factory.updateOne(careersAtCollegey);
exports.deleteCareer = factory.deleteOne(careersAtCollegey);
