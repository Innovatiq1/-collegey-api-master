const router = require('express').Router();

const InvestController = require('../../controllers/admin/investAtCollegeyController');

router
	.route('/')
	.get(InvestController.getAllInvests)
	.post(InvestController.createInvest)
	.link(InvestController.getAllInvestCounter);

router
	.route('/:id')
	.get(InvestController.getInvest)
	.patch(InvestController.updateInvest)
	.delete(InvestController.deleteInvest);

module.exports = router;
