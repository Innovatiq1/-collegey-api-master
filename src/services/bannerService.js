import BannerImage from '../models/bannerImages/bannerImage';
//import BannerImage from '../models/bannerImages/bannerImage';
import { getQueryParams } from '../utilities/helpers';

exports.bannerPostServices = {
	async saveBanner(bannerData) {
		try {
			return await BannerImage.create(bannerData);
		} catch (e) {
			throw e;
		}
	},

    async editBanner(id, activeStatus) {
		try {
			return await BannerImage.findByIdAndUpdate(id, {"isActivated": activeStatus});
		} catch (e) {
			throw e;
		}
	},
};

exports.bannerGetServices = {
	async getBannerByUse(bannerFor) {
		return await BannerImage.find({ bannerFor: bannerFor });
	},

	async getBannerForUsers(bannerFor) {
		return await BannerImage.find({ "bannerFor": bannerFor.bannerFor, "isActivated": true });
	},

};
