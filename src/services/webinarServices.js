import Webinars from '../models/Webinars';
import { getQueryParams } from '../utilities/helpers';

exports.webinarPostServices = {
	async saveRequest(requestData) {
		try {
			return await Webinars.create(requestData);
		} catch (e) {
			throw e;
		}
	},

	async updateWebinar(requestData, webinarId) {
		try {
			if (webinarId) {
				return await Webinars.findOneAndUpdate({ _id: webinarId }, requestData, {
					new: true,
				});
			}
			_throwException('webinar not found');
		} catch (e) {
			throw e;
		}
	},

	async deleteWebinar(webinarId) {
		try {
			if (webinarId) {
				await Webinars.updateOne({ _id: webinarId }, { status: 10 });
				return true;
			}
			_throwException('webinar not found');
		} catch (e) {
			throw e;
		}
	},
};

exports.webinarGetServices = {
	async getAll(query, status = null) {
		const params = getQueryParams(query, status);
		return await Webinars.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			sort: params.sortBy,
		});
	},

	async getOne(webinarId) {
		return await Webinars.findOne({ _id: webinarId });
	},
};
