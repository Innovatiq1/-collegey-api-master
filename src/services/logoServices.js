import LogoServices from '../models/logo';
import { getQueryParams } from '../utilities/helpers';

exports.logoPostServices = {
	async saveRequest(requestData) {
		try {
			return await LogoServices.create(requestData);
		} catch (e) {
			throw e;
		}
	},
	async updateLogo(requestData, LogoId) {
		try {
			if (LogoId) {
				return await LogoServices.findOneAndUpdate({ _id: LogoId }, requestData, { new: true });
			} else {
				_throwException('logo not found');
			}
		} catch (e) {
			throw e;
		}
	},
	async deleteLogo(LogoId) {
		try {
			if (LogoId) {
				await LogoServices.findByIdAndDelete({ _id: LogoId });
				return true;
			} else {
				_throwException('privacy not found');
			}
		} catch (e) {
			throw e;
		}
	},

	
	
};
exports.logoGetServices = {
	async getAll(query, status = null) {
		//console.log("==========,",query)
		const params = getQueryParams(query, status);
		return await LogoServices.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			sort: params.sortBy,
		});
	},

	async getOne(LogoId) {
		return await LogoServices.findOne({ _id: LogoId });
	},
	async getOneBySlug(slug) {
		return await LogoServices.findOne({ slug });
	},
};