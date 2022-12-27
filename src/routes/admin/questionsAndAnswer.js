const router = require('express').Router();

const questionsAndAnswersController = require('../../controllers/user/questionAndAnswersController');
const questionsAndAnswersController1 = require('../../controllers/admin/qnaController');

router
	.route('/')
	.get(questionsAndAnswersController1.getAllQuestionsAndAnswers)
	.post(questionsAndAnswersController.createQuestionsAndAnswers);

router
	.route('/updateQuestionStatus')
	.post(questionsAndAnswersController1.updateQuestionsAndAnswers1);
	
router
	.route('/:id')
	.get(questionsAndAnswersController.getQuestionsAndAnswers1)
	.patch(questionsAndAnswersController.updateQuestionsAndAnswers)
	.delete(questionsAndAnswersController.deleteQuestionsAndAnswers);

router.route('/count/data').get(questionsAndAnswersController.getAllQuestionsAndAnswersCounter);

router.route('/QNA/askQuestion').post(questionsAndAnswersController.askQuestion);
router.route('/QNA/answer/:questionId').post(questionsAndAnswersController.answerAQuestion);

module.exports = router;
