import express from "express";

import { deleteOrder, getAllOrders, postOrder, putOrder } from "../controller/order-controller.js";
import { authenticateToken } from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.route("/all").get(authenticateToken,getAllOrders);
orderRouter.route("/").post(postOrder);
orderRouter.route("/:id").put(authenticateToken, putOrder).delete(authenticateToken,deleteOrder);

export default orderRouter;