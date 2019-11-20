"use strict";
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./Swagger/swagger.json");
const sendRoute = require("./Routes/Send");

const app = express();

app.all("/send", sendRoute);

// serves production swagger if process.env.PORT or serves homologation if its not found

if (!process.env.PORT) {
	const homologation = "localhost:3000";
	const swaggerHomologation = Object.assign({}, swaggerDocument, {
		host: homologation,
		schemes: ["http"]
	});

	app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerHomologation));
} else {
	app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = app;
