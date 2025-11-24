import express from "express";

import { getAllOrders, postOrder } from "../controller/order-controller.js";
import { authenticateToken } from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.route("/all").get(authenticateToken,getAllOrders);
orderRouter.route("/").post(postOrder);

export default orderRouter;
