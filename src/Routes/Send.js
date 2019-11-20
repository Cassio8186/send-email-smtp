"use strict";
const Send = require("express").Router();

const auth = require("../middleware/auth");
const SendController = require("../Controller/Send");

Send.post("/send", auth, SendController.sendOne);

module.exports = Send;
