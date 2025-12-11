import express from "express";

import { deleteOrder, getAllOrders, postOrder, putOrder,getOrdersByUserId, putStatus } from "../controller/order-controller.js";
import { authenticateToken } from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.route("/all").get(authenticateToken,getAllOrders);
orderRouter.route("/").post(postOrder);
orderRouter.route("/:id").put(authenticateToken, putOrder).delete(authenticateToken,deleteOrder);
orderRouter.route("/status/:id").put(authenticateToken,putStatus);   
orderRouter.route("/byuser/:id").get(authenticateToken, getOrdersByUserId);

export default orderRouter;