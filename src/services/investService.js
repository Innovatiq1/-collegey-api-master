import InvestProfile from '../models/invest';
import { getQueryParams } from '../utilities/helpers';

exports.investProfilePostService = {
    async saveRequest(requestData) {
        try{
            return await InvestProfile.create(requestData);
        }catch(e){
            throw e
        }
    },
};

exports.investProfileGetService = {
    async getAll(query, status = null) {
        const params = getQueryParams(query, status);
        return await InvestProfile.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
    },
    async fetchAll() {
        return await InvestProfile.find({}).sort({_id:-1});
    },

    async getOne(profileId) {
        return await InvestProfile.findOne({_id: profileId});
    },
};