/* eslint-disable node/no-unsupported-features/es-syntax */
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

import params from './params';

const path = require('path');

const AppError = require('../utils/appError');

aws.config.update({
	secretAccessKey: params.aws_secret_key,
	accessKeyId: params.aws_access_key,
	region: params.s3_region,
});

const s3 = new aws.S3();

const validateFileType = function(file, cb) {
	const allowedFileTypes = /jpeg|jpg|png|gif|pdf|.xlsx|.csv|.doc|.jfif|doc|docx|xls|/;
	const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = allowedFileTypes.test(file.mimetype);
	if (extension && mimeType) {
		return cb(null, true);
	}
	return cb(
		new AppError(
			`Invalid file type: ${file.mimetype}, extension: ${path
				.extname(file.originalname)
				.toLowerCase()}`,
			400
		)
	);
};

const multerStorage = multerS3({
	s3: s3,
	acl: 'public-read',
	bucket: params.s3_bucket,
	key: function(req, file, cb) {
		const fileString = file.originalname.split('.'); 
		const fileName = `${fileString[0]}${path.extname(
			file.originalname
		)}`;
		file.uploadedFileName = fileName;

		cb(
			null,
			`${
				req.query.folder !== undefined
					? req.query.folder
					: `${path.extname(file.originalname)}`
			}/${fileName}`
		); //use Date.now() for unique file keys
	},
});

const multerStoragePrivate = multerS3({
	s3: s3,
	acl: 'public-read',
	bucket: params.s3_bucket,
	key: function(req, file, cb) {
		const fileString = file.originalname.split('.'); 
		const fileName = `${fileString[0]}${path.extname(
			file.originalname
		)}`;
		file.uploadedFileName = fileName;

		cb(
			null,
			`${req.query.folder !== undefined ? req.query.folder : `${req.user._id}`}/${fileName}`
		); //use Date.now() for unique file keys
	},
});
const upload = multer({
	storage: multerStorage,
	fileFilter: function(req, file, cb) {
		validateFileType(file, cb);
	},
});

const uploadImage = multer({
	storage: multerStoragePrivate,
	fileFilter: function(req, file, cb) {
		validateFileType(file, cb);
	},
});

exports.uploadPrivate = multer({
	storage: multerStoragePrivate,
	fileFilter: function(req, file, cb) {
		validateFileType(file, cb);
	},
});

export default upload;
