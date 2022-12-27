// eslint-disable-next-line node/no-unsupported-features/es-syntax
import CollegeyFeed from '../models/CollegeyUniversalFeed';

const AppError = require('../utils/appError');
// import { getQueryParams } from '../utilities/helpers';

exports.commentPostServices = {
	async createOne(req, res, next) {
		if (!req.params.id) {
			res.status(400).send({
				message: 'Id can not be empty!',
			});
		}
		const feedData = await CollegeyFeed.findById(req.params.id);

		if (!feedData) return next(new AppError('No Document found with id', 404));
		feedData.comment.push({
			user: req.user._id,
			commentData: req.body.commentData,
		});
		const doc = await CollegeyFeed.findByIdAndUpdate(req.params.id, feedData, {
			new: true,
			runValidators: true,
		});

		if (!doc) return next(new AppError('No Document found with id', 404));

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	},
};

exports.commentGetServices = {
	getAll(req, res) {
		if (!req.params.id) {
			res.status(400).send({
				message: 'Id can not be empty!',
			});
		}

		try {
			CollegeyFeed.findById(req.params.id, (err, data) => {
				if (err)
					res.status(500).send({
						message: err.message || 'Some error occurred while retrieving Comment.',
					});
				else
					res.status(200).json({
						status: 'success',
						data: {
							comment: data.comment,
						},
					});
			});
		} catch (err) {
			res.status(400).send(err);
		}
	},
};

exports.commentDeleteServices = {
	async deleteOne(req, res, next) {
		if (!req.params.id) {
			res.status(400).send({
				message: 'Id can not be empty!',
			});
		}
		if (!req.params.commentId) {
			res.status(400).send({
				message: 'Id can not be empty!',
			});
		}
		const feedData = await CollegeyFeed.findById(req.params.id);

		if (!feedData) return next(new AppError('No Document found with id', 404));

		const isAuth = feedData.comment.find(
			c =>
				String(c._id) === req.params.commentId &&
				String(c.user._id) === String(req.user._id)
		);

		if (!isAuth) {
			return res.status(400).send({ message: 'Not Authorized' });
		}

		const updatedCommentList = feedData.comment.filter(
			c => String(c._id) !== req.params.commentId && String(c.user._id) !== req.user._id
		);

		const doc = await CollegeyFeed.findByIdAndUpdate(
			req.params.id,
			{
				comment: updatedCommentList,
			},
			{
				new: true,
				runValidators: true,
			}
		);

		if (!doc) return next(new AppError('Nothing to delete', 404));

		res.status(204).json({
			status: 'success',
			message: `${doc} has been deleted successfully`,
			data: null,
		});
	},
};
