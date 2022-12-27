import UniverSityLogoServices from '../models/universitylogo';
import { getQueryParams } from '../utilities/helpers';

exports.universitylogoPostServices = {
	async saveRequest(requestData) {
		try {
			return await UniverSityLogoServices.create(requestData);
		} catch (e) {
			throw e;
		}
	},
	async updateBlog(requestData, blogId) {
		try {
			if (blogId) {
				return await UniverSityLogoServices.findOneAndUpdate({ _id: blogId }, requestData, { new: true });
			} else {
				_throwException('logo not found');
			}
		} catch (e) {
			throw e;
		}
	},
	async deleteBlog(blogId) {
		try {
			if (blogId) {
				await UniverSityLogoServices.findByIdAndDelete({ _id: blogId });
				return true;
			} else {
				_throwException('logo not found');
			}
		} catch (e) {
			throw e;
		}
	},

	
	
};
exports.universitylogoGetServices = {
	async getAll(query, status = null) {
		//console.log("==========,",query)
		const params = getQueryParams(query, status);
		return await UniverSityLogoServices.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			sort: params.sortBy,
		});
	},

	async getOne(blogId) {
		return await UniverSityLogoServices.findOne({ _id: blogId });
	},
	async getOneBySlug(slug) {
		return await UniverSityLogoServices.findOne({ slug });
	},
};