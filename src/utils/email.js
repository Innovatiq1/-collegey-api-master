const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
	constructor(user, url) {
		this.to = user.email;
		this.firstName = user.name.split(' ')[0];
		this.url = url;
		this.from = `Collegey Support <${process.env.EMAIL_FROM}>`;
	}

	newTransport() {
		// aws config here
		// if (process.env.NODE_ENV === 'production') {
		// 	// aws
		// 	return nodemailer.createTransport({
		// 		service: 'aws',
		// 		auth: {
		// 			user: process.env.aws_USERNAME,
		// 			pass: process.env.aws_PASSWORD,
		// 		},
		// 	});
		// }
		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
			// Activate in gmail "Less secure app" option
		});
	}

	async send(template, subject) {
		// Render email based on pug template
		const html = pug.renderFile(
			// eslint-disable-next-line global-require
			require('path').resolve(__dirname, `../email_templates/pug/${template}.pug`),
			{
				firstName: this.firstName,
				url: this.url,
				subject,
			}
		);

		// define the email options
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: htmlToText.htmlToText(html),

			// create a transport and send the email
		};
		await this.newTransport().sendMail(mailOptions);
	}

	async sendWelcome() {
		await this.send('Welcome', 'Welcome to the Collegey!');
	}

	async sendPasswordReset() {
		await this.send('passwordReset', 'Your password reset token is here (valid 10 minutes)');
	}
};
