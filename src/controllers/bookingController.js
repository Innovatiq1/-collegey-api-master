const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const catchAsync = require('../utils/catchAsync');
const Project = require('../models/Projects');
const Programs = require('../models/Programs');
const User = require('../models/User');
const UserPrograms = require('../models/userPrograms');
const Booking = require('../models/transactions/bookingModel');
const PaymentHistory = require('../models/transactions/paymentHistory');
const programesPaymentHistory = require('../models/transactions/programsPaymentHistory');
// const AppError = require('../utils/appError');
const factory = require('./factoryFunctions/handlerFactory');

// model import
const PaidProject = require('../models/PaidProjectForStudent');
const { ObjectId } = require('bson');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
	// 1 get the current project to be booked
	const project = await Project.findById(req.params.projectId);

	// 2 create checkout session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		//success_url: `${req.protocol}://${req.get('host')}/?project=${req.params.projectId}&user=${req.user.id}&price=${project.projectPrice.amount}`,
		success_url: `https://collegey.com/success?project=${req.params.projectId}&user=${req.user.id}&price=${project.projectPrice.amount}`,
		cancel_url: `https://collegey.com/cancel`,
		customer_email: req.user.email,
		client_reference_id: req.params.projectId,
		line_items: [  
			{
				name: `${project.title} Project`,
				description: project.description,
				images: [
					`https://collegey.com/assets/images/logo_image/stripe-checkout-collegylogo-22.png`,
				],
				amount: project.projectPrice.amount * 100,
				currency: 'usd',
				quantity: 1,
			},
		],
	});

	const paymentData = {
		project: project._id,
		user: req.user.id,
		price: project.projectPrice.amount,
		transactionId: session.id,
		payment_intent: session.payment_intent,
		paymentType: 'paid',
		status: session.payment_status == 'paid' ? 'success' : 'failed',
	};
	let addPaymentHistory = await PaymentHistory.create(paymentData);

	let result = await Project.findOneAndUpdate(
		{ _id: req.params.projectId },
		{ projectpaymentId: session.payment_intent, projectpaymentStatus: session.payment_status }
	);

	//3 create session as response
	res.status(200).json({
		status: 'success',
		session,
	});
});
exports.getCheckoutSessionPrograms = catchAsync(async (req, res, next) => {
	
	// 1 get the current project to be booked
	const program = await Programs.findById(req.params.programsId);
	
	let cleanText = program.description.replace(/<\/?[^>]+(>|$)/g, "");

	// 2 create checkout session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],

		//success_url: `${req.protocol}://${req.get('host')}/?project=${req.params.projectId}&user=${req.user.id}&price=${project.projectPrice.amount}`,
		success_url: `https://collegey.com/success-program/?project=${req.params.programsId}&user=${req.user.id}&price=${program.cost}`,
		cancel_url: `https://collegey.com/cancel`,
		customer_email: req.user.email,
		client_reference_id: req.params.programsId,
		line_items: [
			{
				name: `${program.title} Programe`,
				description: cleanText,
				images: [
					`https://collegey.com/assets/images/logo_image/stripe-checkout-collegylogo-22.png`,
				],
				amount: program.cost * 100,
				currency: 'usd',
				quantity: 1,
			},
		],
	});

	const paymentData = {
		project: program._id,
		user: req.user.id,
		price: program.cost,
		transactionId: session.id,
		payment_intent: session.payment_intent,
		paymentType: 'paid',
		status: session.payment_status == 'paid' ? 'success' : 'failed',
	};
	let addPaymentHistory = await PaymentHistory.create(paymentData);

	let result = await Programs.findOneAndUpdate(
		{ _id: req.params.programsId },
		{ programepaymentId: session.payment_intent, programepaymentStatus: session.payment_status }
	);
	
	//3 create session as response
	res.status(200).json({
		status: 'success',
		session,
	});
});
exports.getProgramPaymentDone = catchAsync(async (req, res, next) => {
	let condition = {
		program_id: ObjectId(req.body.programId),
		user_id: ObjectId(req.body.userId),
	};
	const program = await UserPrograms.find(condition);
	res.status(200).json({
		status: 'success',
		program,
	});
});

exports.updateProgramPaymentStatus = catchAsync(async (req, res, next) => {
	let condition = {
		Programs: req.body.programId,
		user:req.body.userId
	};
	
	// 1 get the current project to be booked
	const project = await programesPaymentHistory.findOneAndUpdate(condition, {status:"sucess"});
	//console.log("=====prrrr===",project)

	// 2 create checkout session
	
	//3 create session as response
	res.status(200).json({
		status: 'success',
		project,
	});
});



// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
// 	const { project, user, price } = req.query;

// 	if (!project && !user && !price) return next();
// 	await Booking.create({ project, user, price });

// 	res.redirect(req.originalUrl.split('?')[0]);
// });
const createBookingCheckout = async session => {
	const project = session.client_reference_id;
	const user = (await User.findOne({ email: session.customer_email })).id;
	const price = session.amount_total / 100;
	const paid = true;
	await Booking.create({ project, user, price, paid });

	// 0 create user document if user has paid
	const id = project;
	const loggedInUserID = user;

	// 4 check if the user paid Database Exist
	const checkDocumentExist = await PaidProject.find({ user: loggedInUserID }).countDocuments();
	if (checkDocumentExist === 0) {
		// if it doesn't exist, then create a paid'
		await PaidProject.create({ user: loggedInUserID, paidProject: [] });
	}
	// add the id of the project you want to watch
	const query = {
		user: loggedInUserID,
	};

	const update = {
		$addToSet: { paidProject: { project: id } },
	};

	// Query One execution
	await PaidProject.findOneAndUpdate(query, update, {
		new: true,
		runValidators: true,
	});
};

exports.webhookCheckout = catchAsync(async (req, res, next) => {
	const signature = req.headers['stripe-signature'];
	let event;
	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET_KEY
		);
	} catch (err) {
		return res.status(400).send('webhook error', err.message);
	}

	if (event.type === 'checkout.session.completed') {
		createBookingCheckout(event.data.object);

		res.status(200).json({ recieved: true });
	} else res.status(200).json({ recieved: false });
});

// using default factory functions

exports.getAllBookings = factory.getAll(Booking);
exports.getAllBookingCounter = factory.getAllCounter(Booking);
exports.getBooking = factory.getOne(Booking);
exports.createBooking = factory.createOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
