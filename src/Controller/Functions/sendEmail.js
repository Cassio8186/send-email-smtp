"use strict";
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { isEmail } = require("validator");

/**
 *
 * @param {string} user
 * @param {string} to
 * @param {string} text
 * @param {string} pass
 */
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

		const toArray = to.split(",");

		const invalidEmail = toArray.filter(tos => {
			return !isEmail(tos.trim());
		});
		console.log(invalidEmail);

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

const user = "justtestthisapi@gmail.com";
const to = "justtestthisapi@gmail.com, cassio8186@gmail.com";
const text = "Testing with jest";
const pass = "justreallytestit";

const toArray = to.split(",");

if (invalidEmail) {
	console.log("insert a valid sender email adress");
}

console.log(invalidEmail);
module.exports = sendEmail;
