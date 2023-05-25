import Invitations from '../models/Invitations';
import { getQueryParams } from '../utilities/helpers';

exports.invitationPostServices = {
    async saveRequest(requestData) {
        try{
            return await Invitations.create(requestData);
        }catch(e){
            throw e
        }
    },
};

exports.invitationGetServices = {
    async getAll(query, status = null) {
        const params = getQueryParams(query, status);
        return await Invitations.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy });
    },

    async getOne(invitationsId) {
        return await Invitations.findOne({_id: invitationsId});
    },
    async getInvitationByUser(user_id) {
        return await Invitations.find({user_id});
    },

    async getInvitationCountByUser(user_id) {
        const invitations = await Invitations.find({user_id});         
        let total_invitations=0;
        invitations.forEach(k =>{ total_invitations+=k.emails.length;});
        return total_invitations;
    },
};