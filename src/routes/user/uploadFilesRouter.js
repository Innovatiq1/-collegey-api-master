const router = require('express').Router();

// upload s3 Function
const { uploadPrivate } = require('../../config/multer');

const UploadFilesController = require('../../controllers/user/uploadFilesController');

router
	.route('/')
	.get(UploadFilesController.getAllUploadFiless)
	.post(
		uploadPrivate.single('file', 1),
		UploadFilesController.uploadFile,
		UploadFilesController.createUploadFiles
	);

router
	.route('/:id')
	.get(UploadFilesController.getUploadFiles)
	.patch(
		uploadPrivate.single('file', 1),
		UploadFilesController.uploadFile,
		UploadFilesController.updateUploadFiles
	)
	.delete(UploadFilesController.deleteUploadFiles);

router.route('/count/data').get(UploadFilesController.getAllUploadFilesCounter);

module.exports = router;
