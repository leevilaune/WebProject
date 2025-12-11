import express from "express";

import { getAllergens, getOptions } from "../controller/misc-controller.js";

const miscRouter = express.Router();

miscRouter.route("/option").get(getOptions);

miscRouter.route("/allergen").get(getAllergens);

export default miscRouter;
