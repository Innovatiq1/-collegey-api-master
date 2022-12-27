const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
	project: {
		type: mongoose.Schema.ObjectId,
		ref: 'Projects',
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
	payment_intent : {
		type: String,
		required: [true, 'Payment History must have a Payment Intent!'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	paymentType: {
		type: String,
		enum: ['paid', 'free']
	},
	status: {
		type: String,
		enum: ['success', 'failed']
	},
});

paymentHistorySchema.pre(/^find/, function(next) {
	this.populate('user').populate({
		path: 'project',
		select: 'name',
	});
	next();
});

const paymentHistory = mongoose.model('paymentHistory', paymentHistorySchema);
module.exports = paymentHistory;
