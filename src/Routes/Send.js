"use strict";
const Send = require("express").Router();

const sendEmail = require("../Controller/sendEmail");

/**
 * Query params
 * user
 * pass
 * to
 * text
 */

Send.post("/send", async (req, res) => {
	try {
		//TODO put decode user into a middleware
		if (!req.headers.authorization) {
			return res.status(401).send({ Error: "Please, authenticate" });
		}
		const authDecoded = req.headers.authorization.replace("Basic ", "");
		const auth = Buffer.from(authDecoded, "base64").toString("ascii");
		const arrayAuth = auth.split(":");
		const [user, pass] = arrayAuth;

		const { to, text } = req.query;

		const response = await sendEmail(user, to, text, pass);
		return res.status(200).send(response);
	} catch (er) {
		if (er.responseCode === 535) {
			return res.status(401).send({
				Error: er,
				Message:
					"If you think you might have inserted user and password right then enable less secure app and display unlockcaptcha",
				displayunlockcaptcha:
					"https://accounts.google.com/b/0/displayunlockcaptcha",
				lesssecureapp: "https://www.google.com/settings/security/lesssecureapps"
			});
		} else {
			return res.status(401).send({ Error: er });
		}
	}
});

module.exports = Send;
