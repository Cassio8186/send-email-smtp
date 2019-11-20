"use strict";
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { isEmail } = require("validator");

/**
 *
 * @param {string} user
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} pass
 */
const sendEmail = (user, to, subject, text, pass) => {
	return new Promise((resolve, reject) => {
		if (
			user === undefined ||
			to === undefined ||
			text === undefined ||
			pass === undefined
		) {
			reject("informations not fulfilled");
		}

		const toArray = to.split(",");

		const invalidEmail = toArray.filter(tos => {
			return !isEmail(tos.trim());
		});
		if (invalidEmail.length > 0) {
			reject("insert valid destination email addresses");
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
			subject,
			text
		};

		transporter.sendMail(mailOptions, function(error, info) {
			try {
				const { response, accepted, rejected } = info;
				const myResponse = {
					success: "Email sent " + response,
					accepted,
					rejected
				};
				resolve(myResponse);
			} catch (er) {
				reject(error);
			}
		});
	});
};

module.exports = sendEmail;
