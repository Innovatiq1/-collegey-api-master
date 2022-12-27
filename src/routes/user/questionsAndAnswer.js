const router = require('express').Router();

const questionsAndAnswersController = require('../../controllers/user/questionAndAnswersController');

// router.route('/QNA/').get(questionsAndAnswersController.getAllQuestionsAndAnswers);

//router.route('/QNA/:id').get(questionsAndAnswersController.getQuestionsAndAnswers);

router.route('/count/data').get(questionsAndAnswersController.getAllQuestionsAndAnswersCounter);

router.route('/QNA/askQuestion').post(questionsAndAnswersController.askQuestion);
router.route('/QNA/updateQuestions').post(questionsAndAnswersController.updateQuestions);

router.route('/QNA/answer/:questionId').post(questionsAndAnswersController.answerAQuestion);

router.route('/QNA/answer/likedislike/:questionId').post(questionsAndAnswersController.ansLikeDislike);
router.route('/QNA/answer').post(questionsAndAnswersController.postAnswer);
router.route('/QNA').post(questionsAndAnswersController.getAllQuestionsAndAnswers);
router.route('/Myquetions').post(questionsAndAnswersController.getMyQuestionsAndAnswers);
router.route('/questionsByTag').post(questionsAndAnswersController.getQuestionsByTagName);
router.route('/QNA/:id').get(questionsAndAnswersController.getUserQuestionsAndAnswers);
router.route('/QNA/delQuestion/:id').get(questionsAndAnswersController.delete_Question);
router.route('/QNA/delAnswer/:id').get(questionsAndAnswersController.delete_Answer);
module.exports = router;
