import Courses from '../models/courses';
import { getQueryParams } from '../utilities/helpers';

exports.coursePostServices = {
    async saveRequest(requestData) {
        try{
            return await Courses.create(requestData);
        }catch(e){
            throw e
        }
    },

    async updateCourse(requestData, courseId) {
        try{
            if(courseId){
                return await Courses.findOneAndUpdate({_id: courseId}, requestData, { new: true });
            }else{
                _throwException('course not found');
            }
        }catch(e){
            throw e
        }
    },

    async deleteCourse(courseId) {
        try{
            if(courseId){
                await Courses.updateOne({_id: courseId}, {status: 10});
                return true
            }else{
                _throwException('course not found');
            }
        }catch(e){
            throw e
        }
    },
};

exports.courseGetServices = {
    async getAll(query, status = null) {
        const params = getQueryParams(query, status);
        return await Courses.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy });
    },

    async getOne(courseId) {
        return await Courses.findOne({_id: courseId});
    },
};