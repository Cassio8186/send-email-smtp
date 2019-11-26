"use strict";
import { Request, Response } from "express";
import { errorResponse } from "response";

import sendEmail from "./Functions/sendEmail";

const Send = {
	async send(req: Request, res: Response) {
		try {
			const { user, password } = req.auth;
			const { to, text, subject } = req.query;

			const response = await sendEmail(user, to, subject, text, password);
			return res.status(200).send(response);
		} catch (er) {
			if (er.responseCode === 535) {
				const ErrorMessage: errorResponse = {
					Error: er,
					Message:
						"If you think you might have inserted user and password right then enable less secure app and display unlockcaptcha",
					displayunlockcaptcha:
						"https://accounts.google.com/b/0/displayunlockcaptcha",
					lesssecureapp:
						"https://www.google.com/settings/security/lesssecureapps"
				};
				return res.status(401).send(ErrorMessage);
			} else {
				return res.status(401).send({ Error: er });
			}
		}
	}
};

export default Send;
