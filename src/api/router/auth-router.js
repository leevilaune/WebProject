import express from "express";

import { getMe, postLogin } from "../controller/auth-controller.js";

import { authenticateToken } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.route("/login").post(postLogin);

authRouter.route("/me").get(authenticateToken, getMe);

export default authRouter;
