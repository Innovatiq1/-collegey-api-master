// api-routes.js
// Initialize express router
const router = require('express').Router();
// const accessCheck = require('../../utilities/acl');

// Set default API response
router.get('/', function(req, res) {
	res.json({
		status: 'API Its Working',
		message: 'Welcome to APIS',
	});
});

// router.use(accessCheck);
// Import contact routes
const user = require('./user');
const blogs = require('./blogs');
const privacy = require('./privacy');
const logo = require('./logo');
const university = require('./university');
const collegelogo = require('./collegelogo');
const badge = require('./badge');
const assignbadge = require('./assignbadge');
const universitylogo = require('./universitylogo');

const collegefund = require('./collegefund');
const collegepartner = require('./collegepartner');
const terms = require('./terms');
const webnars = require('./webnars');
const projects = require('./projects');
const userProjects = require('./userProjects');
const programs = require('./programs');
const courses = require('./courses');
const conferences = require('./conferences');
const invitee = require('./inviteeRoute');
const career = require('./career');
const invest = require('./invest');
const subscription = require('./subscriptions');
const enrollment = require('./enrollment');
const faq = require('./faq');
const review = require('./review');
const team = require('./team');
const boardofadvisors = require('./boardofadvisors');
const boardofdirectors = require('./boardofdirectors');
const investAtCollegey = require('./investAtCollegey');
const careerAtCollegey = require('./careerAtCollegey');
const newsletter = require('./newsletter');
const adminUserListing = require('./adminUserListing');
const userFollowActivity = require('./userFollowActivity');
const userGroupActivity = require('./userGroupActivity');
const userWatchlistActivity = require('./userWatchlistActivity');
const questionsAndAnswers = require('./questionsAndAnswer');
const collegeyFeeds = require('./collegeyFeed');
const collegeyInInvest = require('./collegeyInvestIn');
const collegeyInFund = require('./collegeyInFund');
const collegeyWithPartner = require('./collegeyWithPartner');
const collegeyAtCareer = require('./collegeyAtCareer');
const project = require('./project');
const event = require('./event');
const chats = require('./chats');
const PaidProject = require('./PaidProject');
const announcement = require('./announcement');
const mentorRoute = require('./mentorRoute');
const studentRoute = require('./studentRoute');
const emailConfigurationRoute = require('./emailConfigurationRoute');

//banner Route
const bannerRoute = require('./bannerImage');

// user routes
router.use('/user', user);
router.use('/blogs', blogs);
router.use('/privacy', privacy);
router.use('/logo', logo);
router.use('/collegelogo', collegelogo);
router.use('/badge',badge);
router.use('/assignbadge',assignbadge);
router.use('/universitylogo', universitylogo);
router.use('/collegefund', collegefund);
router.use('/university', university);
router.use('/collegeyInInvest', collegeyInInvest);
router.use('/collegeyInFund', collegeyInFund);
router.use('/collegeyWithPartner', collegeyWithPartner);
router.use('/collegeyAtCareer', collegeyAtCareer);
router.use('/collegepartner', collegepartner);


router.use('/terms', terms);
router.use('/webinars', webnars);
router.use('/projects', projects);
router.use('/user-projects', userProjects);
router.use('/programs', programs);
router.use('/courses', courses);
router.use('/conferences', conferences);
router.use('/invitee', invitee);
router.use('/career', career);
router.use('/invest', invest);
router.use('/subscription', subscription);
router.use('/enrollment', enrollment);
router.use('/faq', faq);
router.use('/review', review);
router.use('/team', team);
router.use('/boardofadvisors', boardofadvisors);
router.use('/boardofdirectors', boardofdirectors);
router.use('/investAtCollegey', investAtCollegey);
router.use('/careerAtCollegey', careerAtCollegey);
router.use('/newsletter', newsletter);
router.use('/adminUserListing', adminUserListing);
router.use('/userFollowActivity', userFollowActivity);
router.use('/userGroupActivity', userGroupActivity);
router.use('/userWatchlistActivity', userWatchlistActivity);
router.use('/questionsAndAnswers', questionsAndAnswers);
router.use('/collegeyFeed', collegeyFeeds);
router.use('/project', project);
router.use('/event', event);
router.use('/chats', chats);
router.use('/PaidProject', PaidProject);
router.use('/announcement', announcement);

//banner Image
router.use('/bannerImage', bannerRoute);

// Mento Resouces Api
router.use('/mentor', mentorRoute);

// Email Configuration Api
router.use('/emailConfiguration', emailConfigurationRoute);

// Student Resouces Api
router.use('/student', studentRoute);



// Export API routes
module.exports = router;
