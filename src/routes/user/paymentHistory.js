const express = require('express');

const paymentHistorycontroller = require(`../../controllers/user/paymentHistory`);
// const authcontroller = require(`./../controllers/authController`);

const router = express.Router({});

router
	.route('/userPaymentHistory')
	.post(paymentHistorycontroller.getPaymentHistory);


module.exports = router;
