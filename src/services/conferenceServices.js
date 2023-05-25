import Conferences from '../models/Conferences';
import { getQueryParams } from '../utilities/helpers';

exports.conferencePostServices = {
    async saveRequest(requestData) {
        try{
            return await Conferences.create(requestData);
        }catch(e){
            throw e
        }
    },

    async updateConference(requestData, conferenceId) {
        try{
            if(conferenceId){
                return await Conferences.findOneAndUpdate({_id: conferenceId}, requestData, { new: true });
            }else{
                _throwException('conference not found');
            }
        }catch(e){
            throw e
        }
    },

    async deleteConference(conferenceId) {
        try{
            if(conferenceId){
                await Conferences.updateOne({_id: conferenceId}, {status: 10});
                return true
            }else{
                _throwException('conference not found');
            }
        }catch(e){
            throw e
        }
    },
};

exports.conferenceGetServices = {
    async getAll(query, status = null) {
        const params = getQueryParams(query, status);
        return await Conferences.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy });
    },

    async getOne(conferenceId) {
        return await Conferences.findOne({_id: conferenceId});
    },
};