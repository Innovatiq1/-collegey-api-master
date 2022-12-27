import badgeServices from '../models/badge-master';
import { getQueryParams } from '../utilities/helpers';

exports.badgePostServices = {
	async saveRequest(requestData) {
		try {
			return await badgeServices.create(requestData);
		} catch (e) {
			throw e;
		}
	},
	async updateBadge(requestData, BadgeId) {
		try {
			if (BadgeId) {
				return await badgeServices.findOneAndUpdate({ _id: BadgeId }, requestData, { new: true });
			} else {
				_throwException('logo not found');
			}
		} catch (e) {
			throw e;
		}
	},
	async deleteBadge(BadgeId) {
		try {
			if (BadgeId) {
				await badgeServices.findByIdAndDelete({ _id: BadgeId });
				return true;
			} else {
				_throwException('privacy not found');
			}
		} catch (e) {
			throw e;
		}
	},

	
	
};
exports.badgeGetServices = {
	async getAll(query, status = null) {
		//console.log("==========,",query)
		const params = getQueryParams(query, status);
		return await badgeServices.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			sort: params.sortBy,
		});
	},

	async getOne(BadgeId) {
		return await badgeServices.findOne({ _id: BadgeId });
	},
	async getOneBySlug(slug) {
		return await badgeServices.findOne({ slug });
	},
};