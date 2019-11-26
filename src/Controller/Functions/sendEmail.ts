"use strict";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import validator from "validator";
import { successResponse } from "response";
const { isEmail } = validator;

/**
 * @typedef {object} SuccessMessage
 * @property {string} success - success message
 * @property {Array<string>} accepted - recipient addresses that were accepted by the server
 * @property {Array<string>} rejected - recipient addresses that were rejected by the server
 */

const sendEmail = (
	user: string,
	to: string,
	subject: string,
	text: string,
	pass: string
) => {
	return new Promise<successResponse>((resolve, reject) => {
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
				const myResponse: successResponse = {
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

export default sendEmail;
