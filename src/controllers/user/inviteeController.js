import { inviteePostService,inviteeGetService } from "../../services/inviteeService";
import { emailType,sendEmail } from '../../utilities/emailHelper';
import  invitationFriend  from "../../models/inviteFriend";
import Invitees  from '../../models/Invitees';
import Invitees_join  from '../../models/Invitees-join';
import User  from '../../models/User';
const service = require("../../utils/email");
const nodemailer  = require("nodemailer");

// Load Modal
import membership from '../../models/membership';
import UserModel from '../../models/User';

const _new = async function (req, res, next) {
    try {
       let PostData = req.body;
       let obj;
       const existEmail = await Invitees.findOne({
            email : PostData.email,
       });

       const existEmailJoin = await Invitees_join.findOne({
            email : PostData.email,
       });

       const existEmailUser = await User.findOne({
        email : PostData.email,
   });
       
       if(existEmail || existEmailJoin || existEmailUser)
       {
        return res.status(400).json({
            status: "faild",
            message: "Email address already exists",
         });
       }
       let invitee;
       if(PostData.referemail != '' && typeof PostData.referemail !== 'undefined')
       {
            obj = {
                type: PostData.type,
                firstName: PostData.name,
                lastName: PostData.last_name,
                email: PostData.email,
                referemail: PostData.referemail,
                cellNumber: PostData.cellNumber,
                status: PostData.status,
                other: PostData.qualification,
                isActive: PostData.isActive,
                linkedIn: PostData.linkedIn,   
            } 
            let mailSubject;
            if(PostData.type == 'student')
            {
                mailSubject = 'Student Request';
                sendEmail(emailType.NEW_WAITLIST_ADD_EMAIL,obj);
            }
            else if(PostData.type == 'mentor')
            {
                mailSubject = 'Mentor Request';
                sendEmail(emailType.MENTOR_REQUEST_SUBMITEED,mentor_mailObj);
            }
            
            let mentor_mailObj = {
                email : PostData.email,
                mailSubject: mailSubject,
            };
            //sendEmail(emailType.MENTOR_REQUEST_SUBMITEED,mentor_mailObj); 
            invitee = await inviteePostService.saveInviteejoin(obj);
        }
        else
        {
            obj = PostData;
            invitee = await inviteePostService.saveRequest(obj); 
        }
        if(PostData.type == 'student')
        {
            sendEmail(emailType.NEW_WAITLIST_ADD_EMAIL,invitee);  
        }
        else if(PostData.type == 'mentor')
        {
            sendEmail(emailType.MENTOR_REQUEST_SUBMITEED,invitee);
        }
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

export { _new as new };
export async function activate(req,res,next){
    try{
        const invitee = await inviteePostService.activate(req.body);
        if(invitee){
            // sendEmail(emailType.INVITE_CODE_SHARE_EMAIL,invitee);
            res.status(200).json({
                status: "success",
                message: "Invitee authorized",
                data: true
            });
        }
        else{
            res.status(200).json({
                status: "failure",
                message: "Invitee authorized",
                data: false
            });
        }
    }catch(e){
        next(e);
    }
}

export async function view_memberRefral (req, res, next) {
    try{
        const referData = await membership.findOne({_id: req.body.id});
        const userData  = await UserModel.findOne({_id: referData.referredby});
        res.status(200).json({
            status: "success",
            message: "Member retrieved successfully",
            data: referData,
            userdata:userData,
        });
    }catch(e){
        next(e);
    }
}

export async function send(req,res){
    try{
        let invite = await invitationFriend.create(req.body);

        let mailObj = {
            name : req.body.inviteName,
            email: req.body.email,
            mobile: req.body.mobile_number,
        };
        
        sendEmail(emailType.NEW_INVITATION_FRIEND,mailObj); 
        
        res.status(200).json({
            status: "success",
            message: "Invitation Sent",
            data: invite
        });

    }catch(e){
        console.log(e);
        res.status(400).json({
            status: "failure",
            message: "Invitee authorized",
            data: false,
            error: e
        });
    }
}