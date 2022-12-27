import PrivacyServices from '../models/Privacypolicy';
import { getQueryParams } from '../utilities/helpers';

exports.privacyPostServices = {
	async saveRequest(requestData) {
		try {
			return await PrivacyServices.create(requestData);
		} catch (e) {
			throw e;
		}
	},
	async updateBlog(requestData, blogId) {
		try {
			if (blogId) {
				return await PrivacyServices.findOneAndUpdate({ _id: blogId }, requestData, { new: true });
			} else {
				_throwException('privacy not found');
			}
		} catch (e) {
			throw e;
		}
	},
	async deleteBlog(blogId) {
		try {
			if (blogId) {
				await PrivacyServices.updateOne({ _id: blogId }, { status: 10 });
				return true;
			} else {
				_throwException('privacy not found');
			}
		} catch (e) {
			throw e;
		}
	},

	
	
};
exports.privacyGetServices = {
	async getAll(query, status = null) {
		//console.log("==========,",query)
		const params = getQueryParams(query, status);
		return await PrivacyServices.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			sort: params.sortBy,
		});
	},

	async getOne(blogId) {
		return await PrivacyServices.findOne({ _id: blogId });
	},
	async getOneBySlug(slug) {
		return await PrivacyServices.findOne({ slug });
	},
};