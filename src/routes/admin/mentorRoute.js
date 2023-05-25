const router = require('express').Router();
var mentorController = require('../../controllers/admin/mentor/mentorController');
var pageContentController = require('../../controllers/admin/mentor/pageContentController');

// Mentor Resources
router.post('/addResources',mentorController.add_MentorResources);
router.get('/getMentorResourceTitle',mentorController.getMentorResourceTitle);
router.post('/getMentorResourceInfo',mentorController.getMentorResourceInfo);
router.post('/updateMentorResource',mentorController.updateMentorResource);
router.post('/deleteMentorResource',mentorController.deleteMentorResource);
router.post('/updateMentorResourceTitle',mentorController.updateMentorResourceTitle);
router.get('/getMentorResourcesList',mentorController.getMentorResourcesList);

// Mentor Article
router.post('/addMentorArticle',mentorController.add_MentorArticle);
router.get('/getMentorArticleList',mentorController.getMentorArticleList);
router.post('/getMentorArticleInfo',mentorController.getMentorArticleInfo);
router.post('/updateMentorArticle',mentorController.updateMentorArticle);
router.post('/deleteMentorArticle',mentorController.deleteMentorArticle);

// Mentor Resource Title
router.post('/addResourceTitle',mentorController.add_addResourceTitle);
router.get('/getMentorArticleList',mentorController.getMentorArticleList);
router.post('/getMentorArticleInfo',mentorController.getMentorArticleInfo);
router.post('/updateMentorArticle',mentorController.updateMentorArticle);
router.post('/deleteMentorArticle',mentorController.deleteMentorArticle);

// Home Page Content All End Point

router.post('/newHomepageContent',pageContentController.new_HomepageContent);
router.post('/addHomepageContent',pageContentController.add_HomepageContent);
router.get('/getHomeFirstSecData',pageContentController.getHomeFirstSecData);
router.post('/updateHomepageContent',pageContentController.updateHomepageContent);
router.post('/deleteHomeContents',pageContentController.deleteHomeContents);

// Project Fees Data
router.get('/fetchProjectFeesData',pageContentController.fetchProjectFeesData);
router.post('/fetchSingleProjectFeesData',pageContentController.fetchSingleProjectFeesData);

//user Rewards Data
router.get('/fetchUserRewards/:id',pageContentController.fetchUserRewards);
router.post('/updateRedeemSettingData',pageContentController.updateRedeemSettingData);
router.get('/fetchRewardRedeemSetting',pageContentController.fetchRewardRedeemSetting);
router.post('/addRedeemSettingData',pageContentController.addRedeemSettingData);
router.post('/fetchSingleRewardRedeemedSettingData',pageContentController.fetchSingleRewardRedeemedSettingData);

// Curated Resources
router.post('/addCuratedresources',mentorController.add_Curatedresources);
router.get('/getMentorCuratedList',mentorController.getMentorCuratedList);
router.post('/getMentorCuratedInfo',mentorController.getMentorCuratedInfo);
router.post('/updateCuratedresources',mentorController.updateCuratedresources);
router.post('/deleteMentorCurated',mentorController.deleteMentorCurated);

// Mentor file
router.post('/addMentorFile',mentorController.add_MentorFile); 
router.get('/getMentorFileList',mentorController.getMentorFileList);
router.post('/deleteMentorFile',mentorController.deleteMentorFile);

// Mentor Testimonial
router.get('/getMentorTestimonialList',mentorController.getMentorTestimonialList);
router.post('/updatetestimonialStatus',mentorController.updatetestimonialStatus);

// Mentor Perks
router.post('/addPerks',mentorController.add_MentorPerks);
router.get('/getMentorPerksList',mentorController.getMentorPerksList);
router.post('/getMentorPerksInfo',mentorController.getMentorPerksInfo);
router.post('/updateMentorPerks',mentorController.updateMentorPerks);
router.post('/deleteMentorPerks',mentorController.deleteMentorPerks);

// Agreement Terms
router.post('/addNewAgreement',mentorController.add_NewAgreement);
router.post('/updateAgreementTerms',mentorController.updateAgreementTerms);
router.get('/getAgreementTermsList',mentorController.getAgreementTermsList);
router.post('/getAgreementInfo',mentorController.getAgreementInfo);

// Privacy Policy Terms
router.post('/addNewPrivacy',mentorController.add_NewPrivacy);
router.post('/updatePrivacy',mentorController.updatePrivacy);
router.get('/getPrivacyList',mentorController.getPrivacyList);
router.post('/getPrivacyInfo',mentorController.getPrivacyInfo);

// Collegey Opportunities
router.post('/addCollegeyOpportunities',mentorController.add_CollegeyOpportunities);
router.get('/getCollegeyOpportunitiesList',mentorController.getCollegeyOpportunitiesList);
router.post('/getCollegeyOpportunitiesInfo',mentorController.getCollegeyOpportunitiesInfo);
router.post('/updateCollegeyOpportunities',mentorController.updateCollegeyOpportunities);
router.post('/deleteCollegeyOpportunities',mentorController.deleteCollegeyOpportunities);


module.exports = router;