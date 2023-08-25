import University from '../models/university/university';
//import BannerImage from '../models/bannerImages/bannerImage';
import { getQueryParams } from '../utilities/helpers';

exports.universityPostServices = {
	async saveUniversity(bannerData) {
		try {
			return await University.create(bannerData);
		} catch (e) {
			throw e;
		}
	},

    async editUniversity(id, body) {
		try {
			return await University.findByIdAndUpdate(id, body);
		} catch (e) {
			throw e;
		}
	},
	async getUniversityInfo(body) {
		try {
			return await University.find(body);
		} catch (e) {
			throw e;
		}
	},
};

exports.bannerGetServices = {
	async getUniversity() {
		return await University.find();
	},

	async getBannerForUsers(bannerFor) {
		return await University.find({ "bannerFor": bannerFor.bannerFor, "isActivated": true });
	},

};
