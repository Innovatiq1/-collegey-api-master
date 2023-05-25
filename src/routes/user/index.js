// api-routes.js
// Initialize express router
const router = require('express').Router();

// After sucessfull JWT authentication req.user has user data

// Express ACL => Check permissions for a user
// const accessCheck = require('../../utilities/acl');

// Set default API response
router.get('/', function(req, res) {
	res.json({
		status: 'API Its Working',
		message: 'Welcome to APIS',
	});
});
// router.use(accessCheck);
//Import master routes
const master = require('./master');
// auth routes
const auth = require('./auth');
const profile = require('./profile');
const common = require('./common');
const resources = require('./resources');
const invitee = require('./inviteeRoute');
const career = require('./career');

const invest = require('./invest');
const collegeyPartner = require('./collegey-partner');
const subscription = require('./subscriptions');
const collegeyFeed = require('./collegeyFeed');
const meetOurTeam = require('./meetOurTeam');
const collegefund = require('./collegefund');
const event = require('./event');
const booking = require('./bookingRouter');
const uploadFiles = require('./uploadFilesRouter');
const projectDashboard = require('./projectManagementDashboard');
const forgetPassword = require('./forget-password');
const activity = require('./activity');
const studentChat = require('./studentChat');
const badge = require('./badge');
const rewardspoint = require('./rewardspoint');
const announcement = require('./announcement');
const paymentHistory = require('./paymentHistory');

//banner Route
const bannerRoute = require('./bannerImages');

router.use('/resetPasswordAction', forgetPassword);
router.use('/collegefund', collegefund);
router.use('/master', master);
router.use('/auth', auth);
router.use('/profile', profile);
router.use('/projectDashboard',projectDashboard);
router.use('/common', common);
router.use('/resources', resources);
router.use('/invitee', invitee);
router.use('/career', career);
router.use('/invest', invest);
router.use('/collegeyPartner', collegeyPartner);
router.use('/subscription', subscription);
router.use('/collegeyFeed', collegeyFeed);
router.use('/event', event);
router.use('/booking', booking);
router.use('/uploadfiles', uploadFiles);
router.use('/activity', activity);
router.use('/studentChat', studentChat);
router.use('/badge', badge);
router.use('/rewardspoint', rewardspoint);
router.use('/announcement', announcement);
router.use('/meetOurTeam', meetOurTeam);
router.use('/paymentHistory', paymentHistory);

//banner Image
router.use('/bannerImage', bannerRoute);

//team member
const publicController = require('./../../controllers/public/publicController');
// Add Teams
router.route('/addteam').post(publicController.addTeamMember);

// update Teams
router.route('/updateteam/:id').put(publicController.updateTeamMember);

// delete Teams
router.route('/deleteteam/:id').put(publicController.deleteTeamMember);


// Export API routes
module.exports = router;
