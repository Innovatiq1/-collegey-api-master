const mongoose = require('mongoose');

const programesPaymentHistorySchema = new mongoose.Schema({
	Programs: {
		type: mongoose.Schema.ObjectId,
		ref: 'Programs',
		required: [true, 'Payment History must have a project!'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Payment History must have a user!'],
	},
	price: {
		type: Number,
		required: [true, 'Payment History must have a price!'],
	},
	transactionId : {
		type: String,
		required: [true, 'Payment History must have a Transaction Id!'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	paymentType: {
		type: String,
		enum: ['paid', 'free']
	},
	title: {
		type: String,
		required: [true, 'Payment History must have a Transaction Id!'],
		//enum: ['paid', 'free']
	},
	image: {
		type: String,
		required: [true, 'Payment History must have a Transaction Id!'],
		//enum: ['paid', 'free']
	},
	// title: String,
	// image: String,

	status: {
		type: String,
		enum: ['success', 'failed']
	},
	programStatus: {
		type: String,
		enum: ['InProgress', 'Completed']
	},
});

programesPaymentHistorySchema.pre(/^find/, function(next) {
	this.populate('user').populate({
		path: 'programes',
		select: 'name',
	});
	next();
});

const programPaymentHistory = mongoose.model('programPaymentHistory', programesPaymentHistorySchema);
module.exports = programPaymentHistory;
