"use strict";
import { Router } from "express";
const Send = Router();

import auth from "../middleware/auth";
import SendController from "../Controller/Send";

Send.post("/send", auth, SendController.send);

export default Send;
