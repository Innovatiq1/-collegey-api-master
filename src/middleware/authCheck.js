/* eslint-disable node/no-unsupported-features/es-syntax */
import passport from 'passport';
import { EXCLUDED_URLS } from '../utilities/constants';
import { redisClient } from './redisClient';

const { getToken } = require('../utilities/helpers');

const invalidError = {
	error: {
		code: 'INVALID_AUTHORIZATION_CODE',
		message: 'Invalid authorization code',
	},
};

async function authenticateJwt(req, res, next) {
	// setting Cookies to headers for faster development of application
	if (req.cookies && req.cookies.jwt) {
		req.headers.authorization = `JWT ${req.cookies.jwt}`;
	}

	const urlsConstArray = [];
	Object.keys(EXCLUDED_URLS).forEach(function(key) {
		urlsConstArray.push(EXCLUDED_URLS[key]);
	});
	let checkString = req.path;
	const urlLength = req.url.split('/');
	if (urlLength.length > 3) {
		urlLength.pop();
		checkString = urlLength.join('/');
	}
	if (urlsConstArray.indexOf(checkString) > -1 || req.url.includes('/master/')) {
		next();
	} else {
		const token = getToken(req);
		const invalid = callback => {
			redisClient.lrange('token', 0, 999999999, (err, result) => callback(result));
		};
		invalid(result => {
			if (result.indexOf(token) > -1) {
				return res.status(400).json(invalidError);
				// eslint-disable-next-line no-else-return
			} else {
				passport.authenticate('jwt', function(err, user, info) {
					if (err) return next(err);
					if (!user) return res.status(401).send(invalidError);
					req.user = user;
					next();
				})(req, res, next);
			}
		});
	}
}

module.exports = authenticateJwt;
