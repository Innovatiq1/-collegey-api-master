const router = require('express').Router();
var studentController = require('../../controllers/admin/student/studentController');

// Student Resources
router.post('/addResources',studentController.add_StudentResources);
router.get('/getStudentResourcesList',studentController.getStudentResourcesList);
router.post('/getStudentResourceInfo',studentController.getStudentResourceInfo);
router.post('/updateStudentResource',studentController.updateStudentResource);
router.post('/deleteStudentResource',studentController.deleteStudentResource);

// Student Article
router.post('/addStudentArticle',studentController.add_StudentArticle);
router.get('/getStudentArticleList',studentController.getStudentArticleList);
router.post('/getStudentArticleInfo',studentController.getStudentArticleInfo);
router.post('/updateStudentArticle',studentController.updateStudentArticle);
router.post('/deleteStudentArticle',studentController.deleteStudentArticle);

// Curated Resources
router.post('/addCuratedresources',studentController.add_Curatedresources);
router.get('/getStudentCuratedList',studentController.getStudentCuratedList);
router.post('/getStudentCuratedInfo',studentController.getStudentCuratedInfo);
router.post('/updateCuratedresources',studentController.updateCuratedresources);
router.post('/deleteStudentCurated',studentController.deleteStudentCurated);

// Student file
router.post('/addStudentFile',studentController.add_StudentFile); 
router.get('/getStudentFileList',studentController.getStudentFileList);
router.post('/deleteStudentFile',studentController.deleteStudentFile);

// Student Testimonial
router.get('/getStudentTestimonialList',studentController.getStudentTestimonialList);
router.post('/updatetestimonialStatus',studentController.updatetestimonialStatus);

// Student Perks
router.post('/addPerks',studentController.add_StudentPerks);
router.get('/getStudentPerksList',studentController.getStudentPerksList);
router.post('/getStudentPerksInfo',studentController.getStudentPerksInfo);
router.post('/updateStudentPerks',studentController.updateStudentPerks);
router.post('/deleteStudentPerks',studentController.deleteStudentPerks);

// Agreement Terms
router.post('/addNewAgreement',studentController.add_NewAgreement);
router.post('/updateAgreementTerms',studentController.updateAgreementTerms);
router.get('/getAgreementTermsList',studentController.getAgreementTermsList);
router.post('/getAgreementInfo',studentController.getAgreementInfo);

// Privacy Policy Terms
router.post('/addNewPrivacy',studentController.add_NewPrivacy);
router.post('/updatePrivacy',studentController.updatePrivacy);
router.get('/getPrivacyList',studentController.getPrivacyList);
router.post('/getPrivacyInfo',studentController.getPrivacyInfo);

// Collegey Opportunities
router.post('/addCollegeyOpportunities',studentController.add_CollegeyOpportunities);
router.get('/getCollegeyOpportunitiesList',studentController.getCollegeyOpportunitiesList);
router.post('/getCollegeyOpportunitiesInfo',studentController.getCollegeyOpportunitiesInfo);
router.post('/updateCollegeyOpportunities',studentController.updateCollegeyOpportunities);
router.post('/deleteCollegeyOpportunities',studentController.deleteCollegeyOpportunities);


module.exports = router;