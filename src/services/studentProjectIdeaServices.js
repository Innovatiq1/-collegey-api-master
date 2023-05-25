import StudentProjectIdea from '../models/StudentProjectIdea';
import { getQueryParams } from '../utilities/helpers';

exports.projectIdeaPostServices = {
    async saveRequest(requestData) {
        try{
            return await StudentProjectIdea.create(requestData);
        }catch(e){
            throw e
        }
    },

    async updateProject(requestData, projectId) {
        try{
            if(projectId){
                return await StudentProjectIdea.findOneAndUpdate({_id: projectId}, requestData, { new: true });
            }else{
                _throwException('project not found');
            }
        }catch(e){
            throw e
        }
    },

    async deleteProject(projectId) {
        try{
            if(projectId){
                await StudentProjectIdea.updateOne({_id: projectId}, {status: 10});
                return true
            }else{
                _throwException('project not found');
            }
        }catch(e){
            throw e
        }
    },
};

exports.projectIdeGetServices = {

    async getAll(query,status = null) {
        const params = getQueryParams(query,status);        
        const selectQuery = 'title description student createdAt';
        const populateQuery =  [{ path: 'student',select:'_id name avatar' }];
        return await StudentProjectIdea.paginate(params.filter, { page: params.page, limit: params.limit, select: selectQuery, populate: populateQuery});
    },

    async getOne(projectId) {
        return await StudentProjectIdea.findOne({_id: projectId});
    },

    async getProjectByStudent(student) {
        return await StudentProjectIdea.find({student});
    },
};