import { inviteePostService,inviteeGetService } from "../../services/inviteeService";
import { emailType,sendEmail } from '../../utilities/emailHelper';
import Invitees  from '../../models/Invitees';
import Invitees_join  from '../../models/Invitees-join';
import User  from '../../models/User';
var generatePassword = require('password-generator');
const bcrypt = require('bcryptjs');

export async function index (req, res, next) {
    try{
        const invitees = await inviteeGetService.getAll(req.query);
        // console.log("Invitees",invitees);
        res.status(200).json({
            status: "success",
            message: "Invitees retrieved successfully",
            data: invitees
        });
    }catch(e){
        next(e);
    }
}

export async function view_join (req, res, next) {
    try{
        const invitees = await inviteeGetService.getAllInvit_join(req.query);
        // console.log("Invitees",invitees);
        res.status(200).json({
            status: "success",
            message: "Invitees join retrieved successfully",
            data: invitees
        });
    }catch(e){
        next(e);
    }
}

const _new_join = async function (req, res, next) {
    try {
        const invitee = await inviteePostService.saveInviteejoin(req.body)
        res.status(200).json({
            status: "success",
            message: "Invitee created successfully",
            data: invitee
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new_join as new_join };

const _new = async function (req, res, next) {
    try {
        const invitee = await inviteePostService.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "Invitee created successfully",
            data: invitee
        });
    }
    catch (e) {
        next(e);
    }
};
const _bulk = async function (req, res, next) {
    try {
        const invitee = await inviteePostService.bulkSaveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "Invitees created successfully",
            data: invitee
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };
export { _bulk as bulk};

// export async function activationCode(req,res,next){
//     try{
//         const invitee = await inviteePostService.activateInvitee(req.body,req.params.id);
//         if(invitee){
//             sendEmail(emailType.INVITE_CODE_SHARE_EMAIL,invitee);
//             res.status(200).json({
//                 status: "success",
//                 message: "Invitee updated successfully",
//                 data: invitee
//             });
//         }
//     }catch(e){
//         next(e);
//     }
// }

export async function activationCode(req,res,next){
    console.log("=======test")
    try{
        const invitee_data = await inviteeGetService.getOne(req.params.id);
        const newpassword  = generatePassword(10, false, /[\w\d\?\-]/);
        const passwordHash = await bcrypt.hash(newpassword, 10);
        let user_obj = {
            name: invitee_data.firstName,
            last_name: invitee_data.lastName,
            email: invitee_data.email,
            password: passwordHash,
            type: invitee_data.type,
            Password_Activation: 0,
            passwordChange: true,
        }; 
        const Save_user    = await inviteePostService.saveUserRequest(user_obj);
        console.log("====Save_user====",Save_user)
        const invitestatus = await Invitees.findOneAndUpdate({_id: req.params.id},{status:'active'});
        let mail_subject;
        if(invitee_data.type == 'mentor')
        {
            mail_subject = 'Mentor Info';
        }
        else if(invitee_data.type == 'student')
        {
            mail_subject = 'Student Info';
        }

        let user_mailObj = {
            user_id : Save_user.id,
            email: Save_user.email,
            password: newpassword,
            type: mail_subject,
        };
        if(Save_user){
            console.log("terttts")
            console.log("tstttffffff")
            sendEmail(emailType.INVITE_USER_REGIS_EMAIL,user_mailObj);
            sendEmail(emailType.STUDENT_WELCOME_EMAIL, user_mailObj);
            res.status(200).json({
                status: "success",
                message: "Invitee updated successfully",
                data: user_mailObj
            });
        } else {
           console.log("=2333=test")
            res.status(200).json({
                status: "success",
                message: "Record allready existed in Users",
                //data: user_mailObj
            });

        }
    }catch(e){
        next(e);
    }
}

export async function activationInviteCode(req,res,next){
    try{
        const invitee_data = await inviteeGetService.getOneinviteJoin(req.params.id);
        const newpassword  = generatePassword(10, false, /[\w\d\?\-]/);
        const passwordHash = await bcrypt.hash(newpassword, 10);
        let user_obj = {
            name: invitee_data.firstName,
            last_name: invitee_data.lastName,
            email: invitee_data.email,
            password: passwordHash,
            type: invitee_data.type,
            Password_Activation: 0,
            passwordChange: true,
        };
        if(invitee_data.type == 'mentor')
        { 
            user_obj['mentor_profile.profile.linkedIn'] = invitee_data.linkedIn;
            user_obj['mentor_profile.profile.fullLegalName'] = invitee_data.firstName +' '+ invitee_data.lastName; 
        }
        const Save_user    = await inviteePostService.saveUserRequest(user_obj);
        const invitestatus = await Invitees_join.findOneAndUpdate({_id: req.params.id},{status:'active'});
        let mail_subject;
            
        if(invitee_data.type == 'mentor')
        {
            mail_subject = 'Mentor Info';
        }
        else if(invitee_data.type == 'student')
        {
            mail_subject = 'Student Info';
        }
      console.log("sabe",Save_user )
        let user_mailObj = {
            user_id : Save_user.id,
            email: Save_user.email,
            password: newpassword,
            type: mail_subject,
        }; 
        console.log("====",user_mailObj)
        if(Save_user){
            sendEmail(emailType.INVITE_USER_REGIS_EMAIL,user_mailObj);
            sendEmail(emailType.STUDENT_WELCOME_EMAIL, user_mailObj);
            res.status(200).json({
                status: "success",
                message: "Invitee join updated successfully",
                data: user_mailObj
            });
        }
    }catch(e){
        next(e);
    }

    //new one 

    // try {
    //     const invitee = await Invitees_join.updateOne({_id:req.body.id},{$set:{status:"active"}});
    //     const data = await Invitees_join.findOne({_id:req.params.id});
    //     const user = await User.updateOne({email:data?.email},{$set:{Password_Activation:1}});
    //     console.log('user',user);
    //     if(invitee){
    //         res.status(200).json({
    //             status: "success",
    //             message: "Invitee join updated successfully",
    //         });
    //     }
    // }
    // catch (e) {
    //     next(e);
    // }
}

export async function sendinviteJoinRejected(req,res,next){
    try{
        const invitee_data = await inviteeGetService.getOneinviteJoin(req.params.id);
        const invitestatus = await Invitees_join.findOneAndUpdate({_id: req.params.id},{status:'reject'});
        let user_mailObj = {
            name: invitee_data.firstName,
            email: invitee_data.email,
        }; 
        if(invitestatus){
            sendEmail(emailType.INVITE_USER_REJECT_EMAIL,user_mailObj);
            res.status(200).json({
                status: "success",
                message: "Invitee join updated successfully",
                data: invitestatus
            });
        }
    }
    catch(e){
        next(e);
    }
}

export async function edit (req, res, next) {
    try{
        const invitee = await inviteePostService.updateInvitee(req.body, req.params.id);
        if(invitee){
            res.status(200).json({
                status: "success",
                message: "Invitee updated successfully",
                data: invitee
            });
        }
    }catch(e){
        next(e);
    }
}

const _delete = async function (req, res, next) {
    try {
        const invitee = await inviteePostService.deleteInvitee(req.params.id);
        const data = await Invitees.findOne({_id:req.params.id});
        const user = await User.updateOne({email:data?.email},{$set:{Password_Activation:2}});
        console.log('data',data);
        if(invitee){
            res.status(200).json({
                status: "success",
                message: "Invitee deleted successfully",
            });
        }
    }
    catch (e) {
        next(e);
    }
};
export { _delete as delete };

export async function edit_invitejoin (req, res, next) {
    try{
        const invitee = await inviteePostService.updateInviteejoin(req.body, req.params.id);
        if(invitee){
            res.status(200).json({
                status: "success",
                message: "Invitee join updated successfully",
                data: invitee
            });
        }
    }catch(e){
        next(e);
    }
}

const _delete_invitejoin = async function (req, res, next) {
    try {
        const invitee = await inviteePostService.deleteInviteejoin(req.params.id);
        const data = await Invitees_join.findOne({_id:req.params.id});
        const user = await User.updateOne({email:data?.email},{$set:{Password_Activation:2}});
        if(invitee){
            res.status(200).json({
                status: "success",
                message: "Invitee deleted successfully",
            });
        }
    }
    catch (e) {
        next(e);
    }
};
export { _delete_invitejoin as delete_invitejoin };

export async function view (req, res, next) {
    try{
        const invitee = await inviteeGetService.getOne(req.params.id);
        if(invitee){
            res.status(200).json({
                status: "success",
                message: "Invitee details",
                data: invitee
            });
        }
    }catch(e){
        next(e);
    }
}


export async function view_singleJoin (req, res, next) {
    try{
        const invitee = await inviteeGetService.getOneinvitJoin(req.params.id);
        if(invitee){
            res.status(200).json({
                status: "success",
                message: "Invitee details",
                data: invitee
            });
        }
    }catch(e){
        next(e);
    }
}

//active invitee

export async function activeInvitee (req, res, next) {
    try{
        const invitee = await Invitees.updateOne({_id:req.body.id},{$set:{status:"active"}});
        const data = await Invitees.findOne({_id:req.body.id});
        const user = await User.updateOne({email:data?.email},{$set:{Password_Activation:1}});
        if(invitee){
            res.status(200).json({
                status: "success",
                message: "Invitee Active successfully",
            });
        }
    }catch(e){
        next(e);
    }
}

export async function activeInviteJoin (req, res, next) {
    try{
        const invitee = await Invitees_join.updateOne({_id:req.body.id},{$set:{status:"active"}});
        const data = await Invitees_join.findOne({_id:req.body.id});
        const user = await User.updateOne({email:data?.email},{$set:{Password_Activation:1}});
        if(invitee){
            res.status(200).json({
                status: "success",
                message: "Invitee Join  Active successfully",
            });
        }
    }catch(e){
        next(e);
    }
}