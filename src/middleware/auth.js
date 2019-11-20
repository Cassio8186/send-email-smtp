const auth = (req, res, next) => {
	//TODO put decode user into a middleware
	if (!req.headers.authorization) {
		return res.status(401).send({ Error: "Please, authenticate" });
	}

	const authDecoded = req.headers.authorization.replace("Basic ", "");
	const auth = Buffer.from(authDecoded, "base64").toString("ascii");
	req.auth = auth.split(":");

	next();
};

module.exports = auth;
