"use strict";
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { isEmail } = require("validator");
const sendEmail = (user, to, text, pass) => {
	return new Promise((resolve, reject) => {
		if (
			user === undefined ||
			to === undefined ||
			text === undefined ||
			pass === undefined
		) {
			reject("informations not fulfilled");
		}
		if (!isEmail(user)) {
			reject("insert a valid destination email adress");
		}
		if (!isEmail(to)) {
			reject("insert a valid sender email adress");
		}
		const transporter = nodemailer.createTransport(
			smtpTransport({
				service: "gmail",
				host: "smtp.gmail.com",
				auth: { user, pass }
			})
		);

		const mailOptions = {
			from: user,
			to,
			subject: "Email from testing API",
			text
		};

		transporter.sendMail(mailOptions, function(error, info) {
			try {
				const response = { Sucess: "Email sent " + info.response };
				resolve(response);
			} catch (er) {
				reject(error);
			}
		});
	});
};

module.exports = sendEmail;
