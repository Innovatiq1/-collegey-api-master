import { userGetServices } from "../../services/userServices";
import { invitationPostServices,invitationGetServices } from "../../services/invitationService";
import { getExcelDataFromFile } from '../../utilities/helpers';
import {emailType,sendEmail} from '../../utilities/emailHelper';
exports.sendInvitation = async function(req, res, next){ 
    if(req.file){
        const excel_data=getExcelDataFromFile(req.file.path);
        req.body.emails = excel_data.map(obj => obj.A); 
    }else{
        const emails=req.body.emails;
        req.body.emails=emails.split(',');
    }
    req.body.user_id=req.user._id    
    let invitation = await invitationPostServices.saveRequest(req.body);     
    let total_invitations=await invitationGetServices.getInvitationCountByUser(req.user._id);    
    sendEmail(emailType.INVITATION_EMAIL,req.user,invitation);      
    res.status(200).json({
        status: "success",
        message: "Invitation send successfully",        
        data: {...invitation.toJSON(),total_invitations}
    });
}
exports.counsellorDashboard = async function (req, res, next) {
    try{        
        const userId = req.user._id;
        const profile = await userGetServices.getOne(userId); 
        if(profile){            
            const invitations = await invitationGetServices.getInvitationByUser(req.user._id); 
            let total_invitations=0;
            invitations.forEach(k =>{ total_invitations+=k.emails.length;});
            res.status(200).json({
                status: "success",
                message: "Dashboard info",
                data: {profile,invitations,total_invitations}
            });
        }
    }catch(e){
        next(e);
    }
};