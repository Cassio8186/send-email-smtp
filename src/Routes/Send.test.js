"use strict";
const request = require("supertest")("localhost:3000");

const email = {
	user: "justtestthisapi@gmail.com",
	to: "justtestthisapi@gmail.com",
	tomany: "justtestthisapi@gmail.com, kkeaeman.test@gmail.com",
	text: "Testing with jest",
	pass: "justreallytestit",
	subject: "API test subject"
};
const { user, to, tomany, text, pass, subject } = email;

describe("POST /Send", () => {
	test("responds with email success", async () => {
		const response = await request
			.post("/send/")
			.auth(user, pass, { type: "basic" })
			.query({ to })
			.query({ text })
			.query({ subject });

		expect(response.body.success).toBeTruthy();
		expect(response.status).toBe(200);
	});
});

describe("POST /Send with many emails", () => {
	test("responds with email success", async () => {
		const response = await request
			.post("/send/")
			.auth(user, pass, { type: "basic" })
			.query({ to: tomany })
			.query({ text })
			.query({ subject });

		expect(response.body.success).toBeTruthy();
		expect(response.status).toBe(200);
	});
});

describe("POST /Send missing all informations", () => {
	test("responds with error informations not fulfilled ", async () => {
		const response = await request
			.post("/send/")
			.query({ user })
			.query({ text })
			.auth(user, pass, { type: "basic" });

		expect(response.status).toEqual(401);
		expect(response.body).toStrictEqual({
			Error: "informations not fulfilled"
		});
	});
});

describe("POST /Send  with wrong password", () => {
	test("responds wrong password error", async () => {
		const response = await request
			.post("/send/")
			.query({ user })
			.query({ text })
			.auth(user, "Wrong password", { type: "basic" })
			.query({ to })
			.query({ subject });

		expect(response.status).toEqual(401);
		expect(response.body.Error).toBeTruthy();
		expect(response.body).toMatchObject({
			Error: {},
			Message:
				"If you think you might have inserted user and password right then enable less secure app and display unlockcaptcha",
			lesssecureapp: "https://www.google.com/settings/security/lesssecureapps",
			displayunlockcaptcha:
				"https://accounts.google.com/b/0/displayunlockcaptcha"
		});
		const { responseCode } = response.body.Error;
		expect(responseCode).toBe(535);
	});
});

describe("POST /Send without authentication", () => {
	test("responds with non-authenthicated error", async () => {
		const response = await request
			.post("/send/")
			.query({ user })
			.query({ text })
			.query({ to })
			.query({ subject });

		expect(response.status).toEqual(401);
		expect(response.body.Error).toBeTruthy();
		expect(response.body).toMatchObject({ Error: "Please, authenticate" });
	});
});
describe("POST /Send a invalid destination of many email addresses", () => {
	test("responds with invalid destination address", async () => {
		const response = await request
			.post("/send/")
			.auth(user, pass, { type: "basic" })
			.query({ to: "justtestit@gmail.com, thisiswrongemail" })
			.query({ text })
			.query({ subject });

		expect(response.status).toBe(401);
		expect(response.body).toStrictEqual({
			Error: "insert valid destination email addresses"
		});
	});
});

describe("POST /Send a invalid destination email addresses", () => {
	test("responds with invalid destination email address error", async () => {
		const response = await request
			.post("/send/")
			.auth(user, pass, { type: "basic" })
			.query({ user })
			.query({ text })
			.query({ to: "wrongemailbro" })
			.query({ subject });

		expect(response.status).toEqual(401);
		expect(response.body.Error).toBeTruthy();
		expect(response.body).toMatchObject({
			Error: "insert valid destination email addresses"
		});
	});
});
