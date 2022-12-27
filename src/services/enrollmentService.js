import Enrollment from '../models/Enrollments';
import { getQueryParams } from '../utilities/helpers';

exports.enrollmentPostServices = {
    async saveRequest(requestData) {
        try{
            return await Enrollment.create(requestData);
        }catch(e){
            throw e
        }
    },

    async updateEnrollment(requestData, enrollmentId) {
        try{
            if(enrollmentId){
                return await Enrollment.findOneAndUpdate({_id: enrollmentId}, requestData, { new: true });
            }else{
                _throwException('enrollment not found');
            }
        }catch(e){
            throw e
        }
    },

    async deleteEnrollment(enrollmentId) {
        try{
            if(enrollmentId){
                await Enrollment.remove({_id: enrollmentId},{justOne:true});
                return true
            }else{
                _throwException('enrollment not found');
            }
        }catch(e){
            throw e
        }
    },
};

exports.enrollmentGetServices = {
    async getAll(query, status = null) {
        const params = getQueryParams(query, status);
        return await Enrollment.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy });
    },

    async getOne(enrollmentId) {
        return await Enrollment.findOne({_id: enrollmentId});
    },
};