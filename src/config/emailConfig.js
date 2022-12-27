const AWS = require('aws-sdk');
import params from '../config/params';
import { createTransport } from 'nodemailer';

// AWS.config.update({
// 	secretAccessKey: params.aws_secret_key,
// 	accessKeyId: params.aws_access_key,
// 	region: params.s3_region,
// });
AWS.config.update({
	secretAccessKey: "AphI0ENwJL2+MX0fzxZadHyfl9mexBtu0vfKktNd",
	accessKeyId: "AKIATHXE46AU64XIMF37",
	region: "ap-southeast-1",
});

let transporter = createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USERNAME, 
		pass: process.env.EMAIL_PASSWORD
	} 
});

// let transporter = createTransport({
// 	SES: new AWS.SES({ apiVersion: '2010-12-01' }),
// });

const sendEmail = message => {
	message.from = message.from ? message.from : params.from_email;
	transporter.sendMail(message, function(err, info) {
		if (err) {
			console.log('Mail Error', err);
		}
	});
};
module.exports = { sendEmail };
