import express from 'express';
import { getAllProducts, addProduct} from '../controller/product-controller.js';

const productRouter = express.Router();

productRouter.route("/all").get(getAllProducts);
productRouter.route("/add").post(addProduct);

export default productRouter;