import express from 'express';
import { getAllProducts, addProduct} from '../controller/product-controller.js';
import { authenticateToken } from "../middleware/auth.js";


const productRouter = express.Router();

productRouter.route("/all").get(getAllProducts);
productRouter.route("/add").post(authenticateToken, addProduct);

export default productRouter;