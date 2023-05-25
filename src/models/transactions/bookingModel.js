const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
	project: {
		type: mongoose.Schema.ObjectId,
		ref: 'Projects',
		required: [true, 'Booking must have a project!'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Booking must have a user!'],
	},
	price: {
		type: Number,
		required: [true, 'Booking must have a price!'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	paid: {
		type: Boolean,
		default: false,
	},
});

bookingSchema.pre(/^find/, function(next) {
	this.populate('user').populate({
		path: 'project',
		select: 'name',
	});
	next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
