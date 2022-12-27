const express = require('express');

const bookingcontroller = require(`./../../controllers/bookingController`);
// const authcontroller = require(`./../controllers/authController`);

const router = express.Router({});

router.get(
	'/checkout-session/:projectId',
	// authcontroller.protect,
	bookingcontroller.getCheckoutSession
);

router.get(
	'/checkout-session-progrms/:programsId',
	// authcontroller.protect,
	bookingcontroller.getCheckoutSessionPrograms
);

router.post(
	'/updateProgramPaymentStatus',
	// authcontroller.protect,
	bookingcontroller.updateProgramPaymentStatus
);


router.post(
	'/user',
	// authcontroller.protect,
	bookingcontroller.getProgramPaymentDone
);



// router.use(
// 	authcontroller.protect,
// 	authcontroller.restrictTo('admin')
// );

router
	.route('/')
	.get(bookingcontroller.getAllBookings)
	.post(bookingcontroller.createBooking);

router
	.route('/:id')
	.get(bookingcontroller.getBooking)
	.patch(bookingcontroller.updateBooking)
	.delete(bookingcontroller.deleteBooking);

router.route('/count/data').get(bookingcontroller.getAllBookingCounter);

module.exports = router;
