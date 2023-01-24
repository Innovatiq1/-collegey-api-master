import Programs from '../models/Programs';
import { getQueryParams } from '../utilities/helpers';

exports.programPostServices = {
    async saveRequest(requestData) {
        try{
            return await Programs.create(requestData);
        }catch(e){
            throw e
        }
    },

    async updateProgram(requestData, programId) {
        try{
            if(programId){
                return await Programs.findOneAndUpdate({_id: programId}, requestData, { new: true });
            }else{
                _throwException('program not found');
            }
        }catch(e){
            throw e
        }
    },

    async deleteProgram(programId) {
        try{
            if(programId){
                await Programs.updateOne({_id: programId}, {status: 10});
                return true
            }else{
                _throwException('program not found');
            }
        }catch(e){
            throw e
        }
    },
};

exports.programGetServices = {
    async getAll(query, status = null) {
        const params = getQueryParams(query, status);
        return await Programs.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy });
    },

    async getOne(programId) {
        return await Programs.findOne({_id: programId});
    },

    async getOneByslug(programId) {
        return await Programs.findOne({slug: programId});
    },
};