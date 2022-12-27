import CollegeLogoServices from '../models/collegelogo';
import { getQueryParams } from '../utilities/helpers';

exports.collegelogoPostServices = {
	async saveRequest(requestData) {
		try {
			return await CollegeLogoServices.create(requestData);
		} catch (e) {
			throw e;
		}
	},
	async updateBlog(requestData, blogId) {
		try {
			if (blogId) {
				return await CollegeLogoServices.findOneAndUpdate({ _id: blogId }, requestData, { new: true });
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
				await CollegeLogoServices.findByIdAndDelete({ _id: blogId });
				return true;
			} else {
				_throwException('privacy not found');
			}
		} catch (e) {
			throw e;
		}
	},

	
	
};
exports.collegelogoGetServices = {
	async getAll(query, status = null) {
		//console.log("==========,",query)
		const params = getQueryParams(query, status);
		return await CollegeLogoServices.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			sort: params.sortBy,
		});
	},

	async getOne(blogId) {
		return await CollegeLogoServices.findOne({ _id: blogId });
	},
	async getOneBySlug(slug) {
		return await CollegeLogoServices.findOne({ slug });
	},
};