import emailConfig from '../config/emailConfig';
const ejs = require('ejs');
const emailTemplatePath = '../email_templates/';
import params from '../config/params';
import { mailerText } from '../utilities/appMessages';

// Load Model
import emailConfigurationModel from '../models/email-configuration/emailConfiguration';

const emailType = {
	STUDENT_WELCOME_EMAIL: 1,
	COUNSELLOR_WELCOME_EMAIL: 2,
	RESET_PASSWORD: 11,
	INVITATION_EMAIL: 12,
	INVITE_CODE_SHARE_EMAIL: 15,
	NEW_WAITLIST_ADD_EMAIL:16,
	INVITE_USER_REGIS_EMAIL:17,
	NEW_PROJECT_ADD_EMAIL: 20,
	INVITE_USER_REJECT_EMAIL: 21,
	NEW_MEMBER_REFFERED_EMAIL: 22,
	NEW_MENTOR_CONTACT_COLLEGY: 23,
	MENTOR_REQUEST_SUBMITEED:25,
	NEW_INVITATION_FRIEND: 31,
	ADD_NEW_INVEST_PROFILE : 34,
	ADD_NEW_COLLEGEY_FUNDS: 35,
	ADD_NEW_COLLEGEY_PARTNER: 36,
	ADD_NEW_COLLEGEY_CAREER: 37,
	NEWS_LETTER_SUBSCRIPTION: 39,
	NEW_ADMIN_WELCOME_EMAIL: 40,

	// Recccc Mail
	NEW_RECOMMENDATION:41,

	// ALL Project Related Template
	PROJECT_SIGNUP_EMAIL: 13,
	STUDENT_PROJECT_IDEA_EMAIL: 14,
	STUDENT_PROJECT_APPOROVAL_EMAIL: 18,
	STUDENT_PROJECT_REJECT_EMAIL: 19,
	STUDENT_PROJECT_APPOROVAL_INVITE:24,
	PROJECT_REFFERAL_INVITE: 31,
	SEND_PROJECT_INVOICE:26,
	FREE_PROJECT_JOING:27,
	COMPLETED_PROJECT_MAIL:28,
	INVITE_PROJECT_MEMBER_EMAIL: 29,
	INVITE_NEW_PROJECT_MEMBER_EMAIL: 30,
	MENTOR_PROJECT_INVITE: 32,
	MENTOR_ACCEPT_PROJECT_INVITE_STATUS: 33,
};
const config = {
	"developemnt": {
		"ID": "development",
		"BASE_URL": "https://collegey.com/",
		"MAILER_IMAGE_PATH": "https://collegey.com/assets/images/logo_image",
		"DASHBOARD_URL": "https://collegey.com/",
		"RESET_PASSWORD_URL": "/reset-password",
		"FB_LINK": "https://www.facebook.com/BeCollegey",
		"INSTA_LINK": "https://www.instagram.com/becollegey/",
		"TWITTER_LINK": "https://twitter.com/becollegey",
		"LINKEDIN_LINK": "https://www.linkedin.com/company/collegey/",
		"ADMIN_EMAIL": "syed@collegey.com",
		"CC_INVITE_EMAIL": ["ganesh.vab@gmail.com", "vaghasiyaketanj@gmail.com"]
	},
	"production": {
		"ID": "production",
		"BASE_URL": "https://collegey.com",
		"MAILER_IMAGE_PATH": "https://collegey.com/assets/images/logo_image",
		"DASHBOARD_URL": "https://collegey.com/",
		"RESET_PASSWORD_URL": "/reset-password",
		"FB_LINK": "https://www.facebook.com/BeCollegey",
		"INSTA_LINK": "https://www.instagram.com/becollegey/",
		"TWITTER_LINK": "https://twitter.com/becollegey",
		"LINKEDIN_LINK": "https://www.linkedin.com/company/collegey/",
		"ADMIN_EMAIL": "syed@collegey.com"
	}
}

ejs.delimiter = '?';
const sendEmail = async (type, model, refData) => {
	    const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
		let adminEmail = templateData.admin_email_template[0];
			
    switch (type) {
		
		// Add New Invest Profile
		
		case emailType.ADD_NEW_INVEST_PROFILE: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'add_new_invest_profile.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: adminEmail.email,
				subject: 'Invest in Collegey',
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
		
		case emailType.ADD_NEW_COLLEGEY_FUNDS: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'add_new_collegy_funds.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: adminEmail.email,
				subject: 'Collegey Funds',
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.ADD_NEW_COLLEGEY_PARTNER: { 
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'add_new_collegy_partner.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: adminEmail.email,
				subject: 'Collegey Partner',
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
		
		case emailType.ADD_NEW_COLLEGEY_CAREER: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'add_new_collegy_career.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: adminEmail.email,
				subject: 'Collegey Career',
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
		
		case emailType.NEWS_LETTER_SUBSCRIPTION: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'news_letter_subscription.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: adminEmail.email,
				subject: 'Subcribe to Newsletter',
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
		
		case emailType.NEW_WAITLIST_ADD_EMAIL: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.new_waitlist_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'new_waitlist_email.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: adminEmail.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.MENTOR_REQUEST_SUBMITEED: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.new_mentor_request_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'mentor_request_submit.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}

		// Send Project Receipe

		case emailType.SEND_PROJECT_INVOICE: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.send_project_invoice_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'project_invoice_receipt.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}

		// Send Free Project

		case emailType.FREE_PROJECT_JOING: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.free_project_Joining_template[0];
			model['templateData'] = SelectSection;
			
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'joing_free_project.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}

		// Completed Project

		case emailType.COMPLETED_PROJECT_MAIL: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.completed_project_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'completed_project_send.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}

		// Admin Project Mail Send
		
		case emailType.NEW_PROJECT_ADD_EMAIL: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection  = templateData.new_project_add_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'new_project_add.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: adminEmail.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
	
		case emailType.NEW_MENTOR_CONTACT_COLLEGY: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection  = templateData.new_mentor_contact_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'new_mentor_contact_collegy.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: adminEmail.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
		
		case emailType.STUDENT_PROJECT_APPOROVAL_INVITE: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.student_project_approval_Invite_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'student_project_approval.ejs',
				{ config: params.config, model: model }
			);
			//console.log("=======data===",JSON.stringify(data))
			//console.log("=======model.email===",model.email)
			const emailMessage = {
				to: model.email,
				subject: 'Project Approval status',
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.MENTOR_PROJECT_INVITE: {
			
			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.mentor_project_invite_template[0];
			model['templateData'] = SelectSection;
			
			let data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'mentor_invite_project.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.MENTOR_ACCEPT_PROJECT_INVITE_STATUS: {
			
			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.mentor_accept_project_invite_status_template[0];
			model['templateData'] = SelectSection;

			let data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'mentor_accept_project_invite_status.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.NEW_RECOMMENDATION: {
			
			let data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'send_recommendation_template.ejs',
				{ config: params.config, model: model }
			);
			console.log('-=-=--=>',model);
			const emailMessage = {
				to: model.email_id,
				subject: 'Welcome',
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.PROJECT_REFFERAL_INVITE: {
			
			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.project_refferal_Invite_template[0];
			model['templateData'] = SelectSection;

			let data;	
			if(model.user_exists == 'yes')
			{ 
				data = await ejs.renderFile(
					__dirname + '/' + emailTemplatePath + 'project_reffer_email.ejs',
					{ config: params.config, model: model }
				);
			}
			else
			{
				data = await ejs.renderFile(
					__dirname + '/' + emailTemplatePath + 'project_reffer_usernot.ejs',
					{ config: params.config, model: model }
				);
			} 
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}

		// Project Approval

		case emailType.STUDENT_PROJECT_APPOROVAL_EMAIL: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.student_project_approval_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'student_project_approval.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}

		// Project Reject

		case emailType.STUDENT_PROJECT_REJECT_EMAIL: {


			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.student_project_reject_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'student_project_reject.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.INVITE_USER_REGIS_EMAIL: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'invite_user_share_email.ejs',
				{ config: params.config, model: model }
			);
			console.log('Invitation Model', model);
			const emailMessage = {
				to: model.email,
				subject: 'Collegey '+model.type,
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.NEW_ADMIN_WELCOME_EMAIL: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'invite_admin_share_email.ejs',
				{ config: params.config, model: model }
			);
			console.log('Invitation Model', model);
			const emailMessage = {
				to: model.email,
				subject: 'Collegey '+model.type,
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.NEW_INVITATION_FRIEND: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.new_invite_Friend_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'invite_new_friend.ejs',
				{ config: params.config, model: model }
			);
			// console.log('Invitation Model', model);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.INVITE_PROJECT_MEMBER_EMAIL: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'invite_project_member.ejs',
				{ config: params.config, model: model }
			);
			// console.log('Invitation Model', model);
			const emailMessage = {
				to: model.email,
				subject: 'Project Invitation',
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}
		case emailType.INVITE_NEW_PROJECT_MEMBER_EMAIL: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'invite_new_project_member.ejs',
				{ config: params.config, model: model }
			);
			// console.log('Invitation Model', model);
			const emailMessage = {
				to: model.email,
				subject: 'Project Invitation to New User',
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.INVITE_USER_REJECT_EMAIL: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.invite_user_reject_template[0];
			model['templateData'] = SelectSection;


			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'invite_user_reject_invitejoin_email.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.NEW_MEMBER_REFFERED_EMAIL: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.new_member_reffered_template[0];
			model['templateData'] = SelectSection;
			
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'member_reffer_email.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			}; 
			emailConfig.sendEmail(emailMessage);
			break;
		}

		case emailType.STUDENT_WELCOME_EMAIL: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.welcome_email_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'welcome_email.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
		case emailType.COUNSELLOR_WELCOME_EMAIL: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'counsellor_welcome_email.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: mailerText.WELCOME_EMAIL_SUBJECT,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
		case emailType.RESET_PASSWORD: {

			// Fetch Tenplate Data
			const templateData = await emailConfigurationModel.findOne({ isDeleted: false });
			var SelectSection = templateData.forget_password_template[0];
			model['templateData'] = SelectSection;

			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'reset_password.ejs',
				{ config: params.config, model: model }
			);
			const emailMessage = {
				to: model.email,
				subject: SelectSection.email_subject,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
		case emailType.INVITATION_EMAIL: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'student_invitation.ejs',
				{ config: params.config, model: model, refData: refData }
			);
			const emails = refData.emails;
			emails.forEach(function(toEmail) {
				const emailMessage = {
					to: toEmail,
					subject: mailerText.COLLEGEY_INVITATION_SUBJECT,
					html: data,
				};
				emailConfig.sendEmail(emailMessage);
			});
			break;
		}
		case emailType.INVITE_CODE_SHARE_EMAIL: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'invite_code_share_email.ejs',
				{ config: params.config, model: model }
			);
			// console.log('Invitation Model', model);
			const emailMessage = {
				to: model.email,
				subject: mailerText.INVITATION_CODE_SUBJECT,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
		case emailType.PROJECT_SIGNUP_EMAIL: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'project_signup_request.ejs',
				{ config: params.config, model: model, refData: refData[0] }
			);
			const emailMessage = {
				to: params.config.ADMIN_EMAIL,
				cc: params.config.CC_INVITE_EMAIL,
				subject: 'New Signup request for project ' + refData[0].project.title,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
		case emailType.STUDENT_PROJECT_IDEA_EMAIL: {
			const data = await ejs.renderFile(
				__dirname + '/' + emailTemplatePath + 'student_project_idea.ejs',
				{ config: params.config, model: model, refData: refData }
			);
			const emailMessage = {
				to: params.config.ADMIN_EMAIL,
				cc: params.config.CC_INVITE_EMAIL,
				subject: 'New project "' + refData.title + '" has been created by ' + model.name,
				html: data,
			};
			emailConfig.sendEmail(emailMessage);
			break;
		}
	}
};
module.exports = { emailType, sendEmail };
