const bcrypt = require('bcryptjs');
const { ObjectId } = require('bson');

// Load Helper
import { getQueryParams } from '../../../utilities/helpers';

// Load Model
import emailConfigurationModel from '../../../models/email-configuration/emailConfiguration';

export async function addForgetPasswordTemplate(req, res, next) {
	let postData = req.body;
    let DataPushCondition;

	if (postData.insertaction == 'forget_password_template') {
        var forgetPasswordArray = [];
        var upObjTemp = {
            email_template_type: postData.email_template_type,
			email_subject: postData.email_subject,
			email_content: postData.email_content, 
			bottom_button_text: postData.bottom_button_text,
        };
        forgetPasswordArray.push(upObjTemp);
        DataPushCondition = { $push: { "forget_password_template": { $each: forgetPasswordArray, $position: 0 } } };
    }
	else if (postData.insertaction == 'welcome_mail_template')
	{
		var welcomeMailArray = [];
		var upObjTemp = postData;
		welcomeMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "welcome_email_template": { $each: welcomeMailArray, $position: 0 } } };
	}
    else if (postData.insertaction == 'new_mentor_request_template')
	{
		var mentorRequestMailArray = [];
		var upObjTemp = postData;
		mentorRequestMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "new_mentor_request_template": { $each: mentorRequestMailArray, $position: 0 } } };
	}
    else if (postData.insertaction == 'student_project_approval_template')
	{
		var studentProjectApprovalMailArray = [];
		var upObjTemp = postData;
		studentProjectApprovalMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "student_project_approval_template": { $each: studentProjectApprovalMailArray, $position: 0 } } };
	}
    else if (postData.insertaction == 'student_project_reject_template')
	{
		var studentProjectRejectMailArray = [];
		var upObjTemp = postData;
		studentProjectRejectMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "student_project_reject_template": { $each: studentProjectRejectMailArray, $position: 0 } } };
	}
    else if (postData.insertaction == 'new_project_add_template')
	{
		var newProjectAddMailArray = [];
		var upObjTemp = postData;
		newProjectAddMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "new_project_add_template": { $each: newProjectAddMailArray, $position: 0 } } };
	}
    else if (postData.insertaction == 'invite_user_reject_template')
	{
		var inviteUserRejectMailArray = [];
		var upObjTemp = postData;
		inviteUserRejectMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "invite_user_reject_template": { $each: inviteUserRejectMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'new_member_reffered_template')
	{
		var newMemberRefferedMailArray = [];
		var upObjTemp = postData;
		newMemberRefferedMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "new_member_reffered_template": { $each: newMemberRefferedMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'new_mentor_contact_template')
	{
		var newMemberRefferedMailArray = [];
		var upObjTemp = postData;
		newMentorContactMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "new_mentor_contact_template": { $each: newMentorContactMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'student_project_approval_Invite_template')
	{
		var newMemberstudentProjectApprovalInviteMailArray = [];
		var upObjTemp = postData;
		newMemberstudentProjectApprovalInviteMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "student_project_approval_Invite_template": { $each: newMemberstudentProjectApprovalInviteMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'project_refferal_Invite_template')
	{
		var newMemberstudentProjectApprovalInviteMailArray = [];
		var upObjTemp = postData;
		newMemberstudentProjectApprovalInviteMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "project_refferal_Invite_template": { $each: newMemberstudentProjectApprovalInviteMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'mentor_request_submit_template')
	{
		var newMentorRequestSubmitMailArray = [];
		var upObjTemp = postData;
		newMentorRequestSubmitMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "mentor_request_submit_template": { $each: newMentorRequestSubmitMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'free_project_Joining_template')
	{
		var newfreeProjectJoiningMailArray = [];
		var upObjTemp = postData;
		newfreeProjectJoiningMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "free_project_Joining_template": { $each: newfreeProjectJoiningMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'completed_project_template')
	{
		var newcompletedProjectMailArray = [];
		var upObjTemp = postData;
		newcompletedProjectMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "completed_project_template": { $each: newcompletedProjectMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'invite_project_member_template')
	{
		var inviteProjectMemberMailArray = [];
		var upObjTemp = postData;
		inviteProjectMemberMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "invite_project_member_template": { $each: inviteProjectMemberMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'invite_new_project_member_template')
	{
		var inviteNewProjectMemberMailArray = [];
		var upObjTemp = postData;
		inviteNewProjectMemberMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "invite_new_project_member_template": { $each: inviteNewProjectMemberMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'new_invite_Friend_template')
	{
		var newInviteFriendMailArray = [];
		var upObjTemp = postData;
		newInviteFriendMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "new_invite_Friend_template": { $each: newInviteFriendMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'mentor_project_invite_template')
	{
		var mentorProjectInviteMailArray = [];
		var upObjTemp = postData;
		mentorProjectInviteMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "mentor_project_invite_template": { $each: mentorProjectInviteMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'mentor_accept_project_invite_status_template')
	{
		var mentorAcceptProjectInviteStatusMailArray = [];
		var upObjTemp = postData;
		mentorAcceptProjectInviteStatusMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "mentor_accept_project_invite_status_template": { $each: mentorAcceptProjectInviteStatusMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'new_waitlist_template')
	{
		var newWaitlistMailArray = [];
		var upObjTemp = postData;
		newWaitlistMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "new_waitlist_template": { $each: newWaitlistMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'send_project_invoice_template')
	{
		var sendProjectInvoiceMailArray = [];
		var upObjTemp = postData;
		sendProjectInvoiceMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "send_project_invoice_template": { $each: sendProjectInvoiceMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'admin_email_template')
	{
		var adminMailArray = [];
		var upObjTemp = postData;
		adminMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "admin_email_template": { $each: adminMailArray, $position: 0 } } };
	}
	else if (postData.insertaction == 'admin_email')
	{
		var adminTemplateMailArray = [];
		var upObjTemp = postData;
		adminTemplateMailArray.push(upObjTemp);
		DataPushCondition = { $push: { "admin_email": { $each: adminTemplateMailArray, $position: 0 } } };
	}


	
	try
    {     
        let result = await emailConfigurationModel.findOneAndUpdate(
            { isDeleted: false },
            DataPushCondition
        );
        res.status(200).json({
			status: 'Success',
			message: 'Add Data successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Data failed',
		});
    } 
}

export async function updateForgetPasswordTemplate(req, res, next) {
	let postData = req.body;

	const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
    let DataPushCondition;

	if (postData.insertaction == 'forget_password_template') {
		var SelectSection = templateData.forget_password_template;
		SelectSection[0]['email_template_type'] = postData.email_template_type;
        SelectSection[0]['email_subject'] = postData.email_subject;
		SelectSection[0]['email_content'] = postData.email_content;
		SelectSection[0]['bottom_button_text'] = postData.bottom_button_text;
        DataPushCondition = { "forget_password_template": SelectSection };
	}
	else if (postData.insertaction == 'welcome_mail_template')
	{
		var upObjTemp = postData;
	    DataPushCondition = { "welcome_email_template": upObjTemp };
	}
    else if (postData.insertaction == 'new_mentor_request_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "new_mentor_request_template": upObjTemp };
    }
    else if (postData.insertaction == 'student_project_approval_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "student_project_approval_template": upObjTemp };
    }
    else if (postData.insertaction == 'student_project_reject_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "student_project_reject_template": upObjTemp };
    }
    else if (postData.insertaction == 'new_project_add_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "new_project_add_template": upObjTemp };
    }
    else if (postData.insertaction == 'invite_user_reject_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "invite_user_reject_template": upObjTemp };
    }
	else if (postData.insertaction == 'new_member_reffered_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "new_member_reffered_template": upObjTemp };
    }
	else if (postData.insertaction == 'new_mentor_contact_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "new_mentor_contact_template": upObjTemp };
    }
	else if (postData.insertaction == 'student_project_approval_Invite_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "student_project_approval_Invite_template": upObjTemp };
    }
	else if (postData.insertaction == 'project_refferal_Invite_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "project_refferal_Invite_template": upObjTemp };
    }
	else if (postData.insertaction == 'mentor_request_submit_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "mentor_request_submit_template": upObjTemp };
    }
	else if (postData.insertaction == 'free_project_Joining_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "free_project_Joining_template": upObjTemp };
    }
	else if (postData.insertaction == 'completed_project_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "completed_project_template": upObjTemp };
    }
	else if (postData.insertaction == 'invite_new_project_member_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "invite_new_project_member_template": upObjTemp };
    }
	else if (postData.insertaction == 'invite_project_member_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "invite_project_member_template": upObjTemp };
    }
	else if (postData.insertaction == 'new_invite_Friend_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "new_invite_Friend_template": upObjTemp };
    }
	else if (postData.insertaction == 'mentor_project_invite_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "mentor_project_invite_template": upObjTemp };
    }
	else if (postData.insertaction == 'mentor_accept_project_invite_status_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "mentor_accept_project_invite_status_template": upObjTemp };
    }
	else if (postData.insertaction == 'new_waitlist_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "new_waitlist_template": upObjTemp };
    }
	else if (postData.insertaction == 'send_project_invoice_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "send_project_invoice_template": upObjTemp };
    }
	else if (postData.insertaction == 'admin_email_template')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "admin_email_template": upObjTemp };
    }
	else if (postData.insertaction == 'admin_email')
    {
        var upObjTemp = postData;
	    DataPushCondition = { "admin_email": upObjTemp };
    }
	
	try {
		let result = await emailConfigurationModel.findOneAndUpdate(
            { isDeleted: false },
            DataPushCondition
        );
        res.status(200).json({
            status: 'Success',
            message: 'update Successfully',
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'update faild',
        });
    }
}

export async function getForgetPasswordTemplate(req,res,next){
	try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await emailConfigurationModel.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Data retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Data fetch failed',
		});
    }
}


