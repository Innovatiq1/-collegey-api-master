const PaidProject = require('../../models/PaidProjectForStudent');

const factory = require('../factoryFunctions/handlerFactory');

// using default factory functions

exports.getAllPaidProjects = factory.getAll(PaidProject);
exports.getAllPaidProjectCounter = factory.getAllCounter(PaidProject);
exports.getPaidProject = factory.getOne(PaidProject);
exports.createPaidProject = factory.createOne(PaidProject);
exports.updatePaidProject = factory.updateOne(PaidProject);
exports.deletePaidProject = factory.deleteOne(PaidProject);
