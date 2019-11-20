"use strict";
const sendEmail = require("./Functions/sendEmail");

const Send = {
	async send(req, res) {
		try {
			const [user, pass] = req.auth;
			const { to, text, subject } = req.query;

			const response = await sendEmail(user, to, subject, text, pass);
			return res.status(200).send(response);
		} catch (er) {
			if (er.responseCode === 535) {
				return res.status(401).send({
					Error: er,
					Message:
						"If you think you might have inserted user and password right then enable less secure app and display unlockcaptcha",
					displayunlockcaptcha:
						"https://accounts.google.com/b/0/displayunlockcaptcha",
					lesssecureapp:
						"https://www.google.com/settings/security/lesssecureapps"
				});
			} else {
				return res.status(401).send({ Error: er });
			}
		}
	}
};

module.exports = Send;
