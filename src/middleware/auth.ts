"use strict";
import { Request, Response, NextFunction } from "express";

const auth = (
	req: Request,
	res: Response,
	next: NextFunction
): Response | void => {
	if (!req.headers.authorization) {
		return res.status(401).send({ Error: "Please, authenticate" });
	}

	const authDecoded = req.headers.authorization.replace("Basic ", "");
	const auth = Buffer.from(authDecoded, "base64").toString("ascii");
	const [user, password] = auth.split(":");
	req.auth = { user, password };

	return next();
};

export default auth;
