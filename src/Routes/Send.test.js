"use strict";
const request = require("supertest");
const app = require("../app");

const email = {
	user: "justtestthisapi@gmail.com",
	to: "justtestthisapi@gmail.com",
	text: "Testing with jest",
	pass: "justreallytestit"
};
const { user, to, text, pass } = email;

describe("POST /Send", () => {
	test("responds with email sucess", async () => {
		const response = await request(app)
			.post("/send/")
			.auth(user, pass, { type: "basic" })
			.query({ to })
			.query({ text });

		expect(response.status).toBe(200);
		expect(response.body.Sucess).toBeTruthy();
	});
});

describe("POST /Send missing all informations", () => {
	test("responds with error due ", async () => {
		const response = await request(app)
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
	test("responds with failure", async () => {
		const response = await request(app)
			.post("/send/")
			.query({ user })
			.query({ text })
			.auth(user, "Wrong password", { type: "basic" })
			.query({ to });

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
	test("responds with failure", async () => {
		const response = await request(app)
			.post("/send/")
			.query({ user })
			.query({ text })
			.query({ to });

		expect(response.status).toEqual(401);
		expect(response.body.Error).toBeTruthy();
		expect(response.body).toMatchObject({ Error: "Please, authenticate" });
	});
});

describe("POST /Send invalid sender email adress", () => {
	test("responds with failure", async () => {
		const response = await request(app)
			.post("/send/")
			.auth(user, pass, { type: "basic" })
			.query({ user })
			.query({ text })
			.query({ to: "wrongemailbro" });

		expect(response.status).toEqual(401);
		expect(response.body.Error).toBeTruthy();
		expect(response.body).toMatchObject({
			Error: "insert a valid sender email adress"
		});
	});
});
