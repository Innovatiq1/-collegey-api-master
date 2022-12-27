const Announcement = require('../../models/announcement');
const factory = require('../../controllers/factoryFunctions/handlerFactory');

// using default factory functions

exports.getAllAnnouncements = factory.getAll(Announcement);
exports.getAllAnnouncementCounter = factory.getAllCounter(Announcement);
exports.getAnnouncement = factory.getOne(Announcement);
exports.createAnnouncement = factory.createOne(Announcement);
exports.updateAnnouncement = factory.updateOne(Announcement);
exports.deleteAnnouncement = factory.deleteOne(Announcement);
