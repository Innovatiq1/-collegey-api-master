const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import mongoose from 'mongoose';

const paymentHistory = require('../../models/transactions/paymentHistory');

exports.getPaymentHistory = async function(req, res, next) {
	let postData = req.body;
	try {
		let where = 
			{ user: new mongoose.Types.ObjectId(postData.user_id) };
		let Allaggregate = [
			{
				$match: where,
			},
			{ $sort: { _id: -1 } },
			{
				$lookup: {
					from: 'projects',
					localField: 'project',
					foreignField: '_id',
					as: 'projectData',
				},
			},
			{
				$unwind: { path: '$projectData', preserveNullAndEmptyArrays: true },
			},
		];

		var paymentHistoryData = await paymentHistory.aggregate(Allaggregate);

		res.status(200).json({
			status: 'success',
			message: 'user Payment History',
			data: paymentHistoryData,
		});
	} catch (e) {
		next(e);
	}
};
