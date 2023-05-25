module.exports = function errorHandler(err, req, res, next) {
	//console.log(err);
	const mongoErrorObj = {
		11000: {
			code: 409,
			message: 'Record already exits',
		},
		2: {
			code: 400,
			message: 'Bad request',
		},
		9: {
			code: 400,
			message: 'Failed to parse',
		},
	};
	if (err) {
		const errObject = {
			type: 'Error',
			code: 500,
			message: 'Some error occurred. Please try again.',
		};
		switch (err.name) {
			case 'MongoError': {
				errObject.code = mongoErrorObj[err.code].code;
				errObject.message = mongoErrorObj[err.code].message;
				break;
			}
			case 'CastError': {
				if (err.kind === 'ObjectId') {
					errObject.code = 400;
					errObject.message = 'Invalid Id';
				}
				break;
			}
			case 'ValidationError': {
				errObject.code = 400;
				errObject.message = err.message;
				break;
			}
			case 'custom': {
				errObject.code = err.code;
				errObject.message = err.message;
				break;
			}
			case 'TypeError': {
				errObject.code = 500;
				errObject.message = err.message;
				break;
			}
			case 'Error': {
				errObject.code = err.statusCode;
				errObject.message = err.message;
				break;
			}
			default: {
				errObject.code = 500;
				errObject.message = err.message;
				break;
			}
		}
		return res.status(errObject.code).json(errObject);
	}
};
