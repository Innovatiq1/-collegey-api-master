import TermsServices from '../models/TermsServices';
import { getQueryParams } from '../utilities/helpers';

exports.TermsPostServices = {
	async saveRequest(requestData) {
		try {
			return await TermsServices.create(requestData);
		} catch (e) {
			throw e;
		}
	},
	async updateBlog(requestData, blogId) {
		try {
			if (blogId) {
				return await TermsServices.findOneAndUpdate({ _id: blogId }, requestData, { new: true });
			} else {
				_throwException('blog not found');
			}
		} catch (e) {
			throw e;
		}
	},
	async deleteBlog(blogId) {
		try {
			if (blogId) {
				await TermsServices.updateOne({ _id: blogId }, { status: 10 });
				return true;
			} else {
				_throwException('blog not found');
			}
		} catch (e) {
			throw e;
		}
	},

	
	
};
exports.termsGetServices = {
	async getAll(query, status = null) {
	//	console.log("==========,",query)
		const params = getQueryParams(query, status);
		return await TermsServices.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			sort: params.sortBy,
		});
	},

	async getOne(blogId) {
		return await TermsServices.findOne({ _id: blogId });
	},
	async getOneBySlug(slug) {
		return await TermsServices.findOne({ slug });
	},
};