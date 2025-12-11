import express from 'express';
import { getAllProducts, addProduct, putProduct, deleteProduct, postProductWithoutImage, getProductById} from '../controller/product-controller.js';
import { authenticateToken } from "../middleware/auth.js";
import upload from '../middleware/upload.js';


const productRouter = express.Router();

productRouter.route("/all").get(getAllProducts);
productRouter.route("/add").post(authenticateToken, upload.single("image"), addProduct);
productRouter.route("/add/copy").post(authenticateToken,postProductWithoutImage);
productRouter.route("/:id").put(authenticateToken, putProduct).delete(authenticateToken,deleteProduct).get(getProductById);

export default productRouter;