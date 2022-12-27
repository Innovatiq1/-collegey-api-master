import Subscriptions from '../models/subscriptions';
import { getQueryParams } from '../utilities/helpers';

exports.subscriptionPostService = {
    async saveRequest(requestData) {
        try{
            return await Subscriptions.create(requestData);
        }catch(e){
            throw e
        }
    },
};

exports.subscriptionGetService = {
    async getAll(query, status = null) {
        const params = getQueryParams(query, status);
        return await Subscriptions.paginate({}, { page: params.page, limit: params.limit, sort: params.sortBy });
    },

    async getOne(subscriptionId) {
        return await Subscriptions.findOne({_id: subscriptionId});
    },
};