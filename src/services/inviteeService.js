import Invitees  from '../models/Invitees';
import Invitees_join  from '../models/Invitees-join';
import UserModal from '../models/User';
import { getQueryParams } from '../utilities/helpers';

exports.inviteePostService = {
    async saveRequest(requestData) {
        try{
            return await Invitees.create(requestData);
        }catch(e){
            throw e
        }
    },

    async saveInviteejoin(requestData) {
        try{
            return await Invitees_join.create(requestData);
        }catch(e){
            throw e
        }
    },

    async saveUserRequest(requestData) {
        try{
            console.log("enail",requestData.email)
                let user = await UserModal.find({email:requestData.email});
                console.log("user",user.length)
                if(user.length >0){
                    console.log("==========false")
                    return  false

                }else {
                    console.log("==========true")
                    let user1= await UserModal.create(requestData);
                    
                    return user1
                    

                }

        
            
        }catch(e){
            throw e
        }
    },

    async bulkSaveRequest(requestData) {
        try {
            return await Invitees.insertMany(requestData)
        } catch (error) {
            throw error
        }
    },

    async updateInvitee(requestData, inviteId) {
        try{
            if(inviteId){
                return await Invitees.findOneAndUpdate({_id: inviteId}, requestData, { new: true });
            }else{
                _throwException('blog not found');
            }
        }catch(e){
            throw e
        }
    },

    async updateInviteejoin(requestData, inviteId) {
        try{
            if(inviteId){
                return await Invitees_join.findOneAndUpdate({_id: inviteId}, requestData, { new: true });
            }else{
                _throwException('Invite join is not found');
            }
        }catch(e){
            throw e
        }
    },
    // async activateInvitee(inviteData,inviteId) {
    //     try {
    //         if(inviteId){
    //             return await Invitees.findOneAndUpdate({_id: inviteId},{status:'pending',activation_code:inviteData.activation_code},{new:true})
    //         }
    //     } catch (error) {
    //         throw e
    //     }
    // },
    async activateInvitee(inviteData,inviteId) {
        try {
            if(inviteId){
                return await Invitees.findOneAndUpdate({_id: inviteId},{status:'pending',reset_password_token:inviteData.activation_code},{new:true})
            }
        } catch (error) {
            throw e
        }
    },
    async activate(invite) {
        try {
            if(invite){
                return await Invitees.findOneAndUpdate({email: invite.email,activation_code:invite.activation_code,status:'pending'},{status:'active',isActive:true},{new:true})
            }
        } catch (error) {
            throw e
        }
    },
    async udateByEmail(requestData,inviteeEmail) {
        try {
            requestData.status = 'activated';
            if(inviteeEmail){
                return await Invitees.findOneAndUpdate({email:inviteeEmail,status:'pending'},requestData,{new:true})
            }
        } catch (error) {
            throw e
        }
    },

    async deleteInvitee(inviteId) {
        try{
            if(inviteId){
               var data= await Invitees.updateOne({_id: inviteId}, {status: 10});
                return true
            }else{
                _throwException('blog not found');
            }
        }catch(e){
            throw e
        }
    },

    async deleteInviteejoin(inviteId) {
        try{
            if(inviteId){
                await Invitees_join.updateOne({_id: inviteId}, {status: 10});
                return true
            }else{
                _throwException('invite join not found');
            }
        }catch(e){
            throw e
        }
    },
};

exports.inviteeGetService = {
    async getAll(query, status = null) {
        const params = getQueryParams(query, status);
        return await Invitees.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        // return await Invitees.find();
    },

    async getAllInvit_join(query, status = null) {
        const params = getQueryParams(query, status);
        return await Invitees_join.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        // return await Invitees.find();
    },

    async getOne(inviteId) {
        return await Invitees.findOne({_id: inviteId});
    },

    async getOneinviteJoin(inviteId) {
        return await Invitees_join.findOne({_id: inviteId});
    },

    async getOneinvitJoin(inviteId) {
        return await Invitees_join.findOne({_id: inviteId});
    },

    async getByEmail(inviteEmail) {
        return await Invitees.findOne({email:inviteEmail,status:'pending'})
    },
    async activateInvitee(inviteId) {
        try {
            if(inviteId){
                return await Invitees.findOneAndUpdate({_id: inviteId},{status:'pending'},{new:true})
            }
        } catch (error) {
            throw e
        }
    },
};