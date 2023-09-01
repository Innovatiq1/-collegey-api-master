/* eslint-disable global-require */
/* eslint-disable node/no-unsupported-features/es-syntax */
import authenticateJwt from './middleware/authCheck';
import SanatizeRequest from './middleware/sanatizeRequest';

// Import express
const express = require('express');
// Import Body parser
const bodyParser = require('body-parser');

// reading cookies
const cookieParser = require('cookie-parser');

// Initialize the app
const app = express();
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();
require('./middleware/passport');

const errorHandler = require('./middleware/errorHandler');

// console log BODY before requests
app.use((req, res, next) => {
	console.log('\n🟥 Header Logging in Index.js', req.method, req.originalUrl);
	console.table(req.headers);
	// remove ⬆ comment to see what body data was recieved
	next();
});

// webhook controller
const bookingController = require('./controllers/bookingController');

// webhooks for checkout
app.post(
	'/webhook-checkout',
	express.raw({ type: 'application/json' }),
	bookingController.webhookCheckout
);

// Import routes
const apiRoutesUser = require('./routes/user');
const apiRoutesAdmin = require('./routes/admin');

// Development or Production logging
// eslint-disable-next-line no-console
console.log('🎡', process.env.NODE_ENV.toLocaleUpperCase(), '🎡');

// swagger docs and route
if (process.env.NODE_ENV !== 'production') {
	// const swaggerConf = require('./utilities/swagger');
	// app.use('/docs', swaggerConf);
}

// Configure bodyparser to handle post requests
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: '50mb',
	})
);

app.use(bodyParser.json({ limit: '50mb', extended: true }));

// JWT cookie comes
app.use(cookieParser());

app.use(helmet());
app.use(cors());
app.options('*', cors());
// app.use(passport.initialize());

require('./config/db');

const port = process.env.PORT || 3000;

// Send message for default URL
app.get('/', (req, res) => res.send(`Application is running`));

// Use Api routes in the App
app.use('/api1/forget',apiRoutesUser);
app.use('/api', authenticateJwt, SanatizeRequest('api'), apiRoutesUser);
app.use('/api/admin', authenticateJwt, SanatizeRequest('admin'), apiRoutesAdmin);

// ----------------------------------------------------------------------------------

const master = require('./routes/user/master');
// x-api import (secured Routes)
const collegeyFeed = require('./routes/user/collegeyFeed');
const questionsAndAnswer = require('./routes/user/questionsAndAnswer');
const event = require('./routes/user/event');
const mentor = require('./routes/user/mentor');
const recommend = require('./routes/user/recommend');
const invite = require('./routes/user/inviteeRoute');
const upload = require('./routes/user/uploadFilesRouter');


// activity contains Follow API, Groups API
const activity = require('./routes/user/activity');

// x-api routes without any JWT
app.use('/x-api/v1/user/master', master);
app.use('/x-api/v1/user/collegeyFeed', authenticateJwt, collegeyFeed);
app.use('/x-api/v1/user/activity', authenticateJwt, activity);
app.use('/x-api/v1/user/questionsAndAnswer', authenticateJwt, questionsAndAnswer);
app.use('/x-api/v1/user/event', authenticateJwt, event);
app.use('/x-api/v1/user/mentor', mentor);
app.use('/x-api/v1/user/recommend', authenticateJwt, recommend);
app.use('/x-api/v1/user/invite', authenticateJwt, invite);
app.use('/x-api/v1/user/upload', authenticateJwt, upload);



//  x-api import (Public Routes)
const apiRoutesPublic = require('./routes/public/pubicRouter');

// x-api routes without any JWT
app.use('/x-api/v1/public', apiRoutesPublic);

// Global Error Handler
app.use(errorHandler);

app.use(function(req, res) {
	res.status(404).send({ url: `${req.originalUrl} not found` });
});

// Launch app to listen to specified port
app.listen(port, function() {
	console.log(`Running Node source on port ${port}`);
});

// __LAST LINE CODE___
