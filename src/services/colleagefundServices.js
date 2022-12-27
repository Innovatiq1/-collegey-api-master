import CollegeFundServices from '../models/collegeFund';
import { getQueryParams } from '../utilities/helpers';

exports.colleageFundPostServices = {
	async saveRequest(requestData) {
		try {
			return await CollegeFundServices.create(requestData);
		} catch (e) {
			throw e;
		}
	},
};
exports.colleageFundGetServices = {
	async getAll(query, status = null) {
		//console.log("==========,",query)
		const params = getQueryParams(query, status);
		return await CollegeFundServices.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			sort: params.sortBy,
		});
	},

	async fetch_all(query, status = null) {
		return await CollegeFundServices.find({}).sort({_id:-1});
	},
};
