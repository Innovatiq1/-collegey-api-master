const InvestsAtCollegey = require('../../models/investsAtCollegey');

const factory = require('../factoryFunctions/handlerFactory');

// using default factory functions

exports.getAllInvests = factory.getAll(InvestsAtCollegey);
exports.getAllInvestCounter = factory.getAllCounter(InvestsAtCollegey);
exports.getInvest = factory.getOne(InvestsAtCollegey);
exports.createInvest = factory.createOne(InvestsAtCollegey);
exports.updateInvest = factory.updateOne(InvestsAtCollegey);
exports.deleteInvest = factory.deleteOne(InvestsAtCollegey);
