import CollegeyPartner from '../models/collegeyPartner';
import { getQueryParams } from '../utilities/helpers';

exports.collegeyPartnerPostService = {
    async saveRequest(requestData) {
        try{
            return await CollegeyPartner.create(requestData);
        }catch(e){
            throw e
        }
    },
};

exports.collegeyPartnerGetService = {
    async getAll(query, status = null) {
        const params = getQueryParams(query, status);
        return await CollegeyPartner.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
    },
    
    async fetch_all() {
        return await CollegeyPartner.find({}).sort({_id:-1});
    },

    async getOne(profileId) {
        return await CollegeyPartner.findOne({_id: profileId});
    },
};