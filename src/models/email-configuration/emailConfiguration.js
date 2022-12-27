import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const emailConfigurationSchema = new mongoose.Schema(
    {
        forget_password_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_content: {type: String},
			bottom_button_text: {type: String},
		}],

		welcome_email_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_welcome_text: { type: String },

			email_content1: {type: String},
			email_content2: {type: String},

			email_content3_title: {type: String},
			email_content3: {type: String},

			email_content4_title: {type: String},
			email_content4: {type: String},

			email_content5_title: {type: String},
			email_content5: {type: String},

			bottom_line_text: {type: String},
			bottom_button_text: {type: String},
		}],

		new_mentor_request_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],

		student_project_approval_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],

		student_project_reject_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		new_project_add_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		invite_user_reject_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		new_member_reffered_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			inviteBy: { type: String },
			
			email_content: {type: String},
		}],
		new_mentor_contact_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			mentorName: { type: String },
			mentorEmail: { type: String },
			message: { type: String },
			email_content: {type: String},
		}],
		student_project_approval_Invite_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		project_refferal_Invite_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		mentor_request_submit_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		free_project_Joining_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		completed_project_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		
		invite_new_project_member_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			password: { type: String },
			email: { type: String },
			email_content: {type: String},
		}],
		invite_project_member_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			password: { type: String },
			email: { type: String },
			email_content: {type: String},
		}],
		new_invite_Friend_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			
			inviteByCollegey: { type: String },
			email_content: {type: String},
		}],
		mentor_project_invite_template: [{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		mentor_accept_project_invite_status_template:
		[{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		send_project_invoice_template:
		[{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		new_waitlist_template:
		[{
			email_template_type: { type: String },
			email_subject: { type: String },
			email_top_header_text: { type: String },
			email_content: {type: String},
		}],
		admin_email_template:
		[{
		email: { type: String },
		}],
		admin_email:
		[{
			email_subject: { type: String },
			
			email_content: {type: String},

		}],

		isDeleted: { type: Boolean, default: false},
        createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
    },
);
emailConfigurationSchema.plugin(mongoosePaginate);

const emailConfiguration = mongoose.model('emailConfiguration', emailConfigurationSchema);
module.exports = emailConfiguration;
