import CareerProfile from '../models/career';
import { getQueryParams } from '../utilities/helpers';

exports.careerProfilePostService = {
    async saveRequest(requestData) {
        try{
            return await CareerProfile.create(requestData);
        }catch(e){
            throw e
        }
    },
};

exports.careerProfileGetService = {
    async getAll(query, status = null) {
        const params = getQueryParams(query, status);
        return await CareerProfile.paginate({}, { page: params.page, limit: params.limit, sort: params.sortBy });
    },
    
    async fetch_all() {
        return await CareerProfile.find({}).sort({_id:-1});
    },

    async getOne(profileId) {
        return await CareerProfile.findOne({_id: profileId});
    },
};