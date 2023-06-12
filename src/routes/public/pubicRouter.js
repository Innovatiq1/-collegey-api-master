/* eslint-disable node/no-unsupported-features/es-syntax */
// upload s3 Function
import upload from '../../config/multer';
import uploadCustAdmin from '../../config/adminCustmulter';

const express = require('express');
const publicController = require('./../../controllers/public/publicController');

const router = express.Router();

// 🎡🎡 all parent URL contains 🎡🎡
// {{url}}/x-api/v1/public/

// FAQs
router.route('/faq').get(publicController.getAllFAQs);
router.route('/faqCategories').get(publicController.getAllCategory);

// Get All Reviews
router.route('/review').get(publicController.getAllReviews);

// Get User Reward
router.route('/userReward').post(publicController.getUserReward);

// Get All Teams
router.route('/team').get(publicController.getAllTeams);

// Get All Teams admin side
router.route('/listteam').get(publicController.getTeamAdmin);

// Get the All event in sequel
router.route('/listAllsequelEvents' ).get(publicController.listAllsequelEvents);

// Add Teams
// router.route('/addteam').post(publicController.addTeamMember);

// update Teams
// router.route('/updateteam/:id').put(publicController.updateTeamMember);

// delete Teams
// router.route('/deleteteam/:id').put(publicController.deleteTeamMember);

// Get All Advisors
router.route('/advisors').get(publicController.getAllAdvisors);

// Get All Teams
router.route('/directors').get(publicController.getAllDirectors);

// post Invest at Collegey
router.route('/collegey/InvestAtCollegey').post(publicController.createInvestsAtCollegey);

// post career at Collegey
router.route('/collegey/CareersAtCollegey').post(publicController.createCareersAtCollegey);

// post newsletter request api
router.route('/newsletter').post(publicController.createNewsletter);

// get sdg list
router.route('/getSdgList').get(publicController.getSdgList);

// test upload file
router.route('/uploadFile').post(upload.single('files', 1), publicController.uploadFile);
router.route('/uploadCustAdminFile').post(uploadCustAdmin.single('files', 1), publicController.uploadCustAdminFile);

// get pragrams
router.route('/pragrams/:id').get(publicController.getOneProgram);

// get pragrams
router.route('/pragrams').get(publicController.getAllPrograms);

// get waitlist
router.route('/waitlist').post(publicController.createOneWaitlist);

// get terms
router.route('/terms').get(publicController.getAllTerms);

// get privacy
router.route('/privacy').get(publicController.getAllPrivacy);

// Get EdiStart Footer logo
router.route('/edistartlogo').get(publicController.getAllLogo);

// Get University logo
router.route('/universitylogo').get(publicController.getAllUniversityLogo);

// Get College logo
router.route('/collegelogo').get(publicController.getAllCollegeLogo);

//get meet out team title
const meetOurTeam = require('../user/meetOurTeam'); 
router.use('/meetOurTeam', meetOurTeam);

//collegey fund
const collegeyInFund = require('../admin/collegeyInFund');
router.use('/collegeyInFund', collegeyInFund);

//collegey invest
const collegeyInInvest = require('../admin/collegeyInvestIn');
router.use('/collegeyInInvest', collegeyInInvest);

//collegey partner
const collegeyWithPartner = require('../admin/collegeyWithPartner');
router.use('/collegeyWithPartner', collegeyWithPartner);

//collegey career
const collegeyAtCareer = require('../admin/collegeyAtCareer');
router.use('/collegeyAtCareer', collegeyAtCareer);

//country code
import masterController from '../../controllers/master';
router.get('/country', masterController.getCountries);
//partner
var collegeyPartner = require("../user/collegey-partner")
router.use('/collegeyPartner', collegeyPartner);
//career
var common = require("../user/common")
router.use('/common', common);


module.exports = router;
