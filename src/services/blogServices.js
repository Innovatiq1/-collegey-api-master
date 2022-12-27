import Blogs from '../models/Blogs';
import { getQueryParams } from '../utilities/helpers';

exports.blogPostServices = {
	async saveRequest(requestData) {
		try {
			return await Blogs.create(requestData);
		} catch (e) {
			throw e;
		}
	},

	async updateBlog(requestData, blogId) {
		try {
			if (blogId) {
				return await Blogs.findOneAndUpdate({ _id: blogId }, requestData, { new: true });
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
				await Blogs.updateOne({ _id: blogId }, { status: 10 });
				return true;
			} else {
				_throwException('blog not found');
			}
		} catch (e) {
			throw e;
		}
	},
};

exports.blogGetServices = {
	async getAll(query, status = null) {
		const params = getQueryParams(query, status);
		return await Blogs.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			sort: params.sortBy,
		});
	},

	async getOne(blogId) {
		return await Blogs.findOne({ _id: blogId });
	},
	async getOneBySlug(slug) {
		return await Blogs.findOne({ slug });
	},
};
