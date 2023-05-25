const router = require('express').Router();

const careerAtCollegeyController = require('../../controllers/admin/carrerAtCollegeyController');

router
	.route('/')
	.get(careerAtCollegeyController.getAllCareers)
	.post(careerAtCollegeyController.createCareer)
	.link(careerAtCollegeyController.getAllCareerCounter);

router
	.route('/:id')
	.get(careerAtCollegeyController.getCareer)
	.patch(careerAtCollegeyController.updateCareer)
	.delete(careerAtCollegeyController.deleteCareer);

module.exports = router;
