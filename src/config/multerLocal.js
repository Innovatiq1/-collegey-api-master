import multer from 'multer';
const path = require('path');
const excelFilter = function(req, file, cb) {
	if (!file.originalname.match(/\.(xlsx)$/)) {
		req.fileValidationError = 'Only xlsx files are allowed!';
		return cb(new Error('Only Excel files are allowed!'), false);
	}
	cb(null, true);
};
const fileUpload = function upload(destinationPath) {
	return multer({
		fileFilter: excelFilter,
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				cb(null, destinationPath);
			},
			filename: function(req, file, cb) {
				cb(null, Date.now() + path.extname(file.originalname));
			},
		}),
	});
};
export default fileUpload;
