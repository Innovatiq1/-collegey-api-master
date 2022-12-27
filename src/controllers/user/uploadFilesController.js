const UploadFiles = require('../../models/upload/uploadModel');

// Factory Functions
const catchAsync = require('../../utils/catchAsync');

// {{url}}/api/uploadFiles/
exports.uploadFile = catchAsync(async (req, res, next) => {
	// console.log(req.file)
	if (req.file && req.file.key) {
		// respose of file name and url
		// res.status(200).json({
		// 	status: 'success',
		// 	owner: req.user._id,
		// 	fileUrl: req.file.location,
		// });

		//  file url and user id to request body
		req.body.fileUrl = req.file.location;
		req.body.owner = req.user._id;

		next();
	} else {
		res.status(400).json({
			status: 'error',
			problem: 'file missing',
		});
	}
});

const factory = require('../factoryFunctions/handlerFactory');

// using default factory functions

exports.getAllUploadFiless = factory.getAll(UploadFiles);
exports.getAllUploadFilesCounter = factory.getAllCounter(UploadFiles);
exports.getUploadFiles = factory.getOne(UploadFiles);
exports.createUploadFiles = factory.createOne(UploadFiles);
exports.updateUploadFiles = factory.updateOne(UploadFiles);
exports.deleteUploadFiles = factory.deleteOne(UploadFiles);
