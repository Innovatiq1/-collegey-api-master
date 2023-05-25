// eslint-disable-next-line node/no-unsupported-features/es-syntax
import { EXCLUDED_URLS } from './constants';

const router = require('express').Router();
const acl = require('express-acl');

const API = '/api';

const urlsConstArray = [];
Object.keys(EXCLUDED_URLS).forEach(function(key) {
	urlsConstArray.push(API + EXCLUDED_URLS[key]);
});

acl.config({
	filename: '/src/utilities/nacl.json',
	baseUrl: 'api',
	decodedObjectName: 'user',
	roleSearchPath: 'user.type',
});

router.use(
	acl.authorize.unless({
		path: urlsConstArray,
	})
);

module.exports = router;
