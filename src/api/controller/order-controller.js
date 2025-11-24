import { order, product, option, allergen } from "../model/index.js";

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await order.findAll({
            include: {
                model: product,
                as: "products",
                include: [
                    {
                        model: option,
                        as: "options",
                        attributes: ["option_id", "name", "description"],
                        through: { attributes: [] },
                    },
                    {
                        model: allergen,
                        as: "allergens",
                        attributes: [
                            "allergen_id",
                            "allergen_name",
                            "allergen_icon_url",
                        ],
                        through: { attributes: [] },
                    },
                ],
                attributes: [
                    "product_id",
                    "name",
                    "price",
                    "description",
                    "image_url",
                    "category",
                    "default_product",
                ],
                through: { attributes: [] },
            },
        });
        console.log(orders);
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

const postOrder = async (req, res, next) => {
    const { delivery_address, price, user_id, product_ids } = req.body;
    const timestamp = Date.now();
    try {
        const newOrder = await order.create({
            delivery_address: delivery_address,
            price: price,
            user_id: user_id,
            timestamp: timestamp,
        });
        if (product_ids && product_ids.length > 0) {
            await newOrder.setProducts(product_ids);
        }
        res.json({ success: true, new: newOrder });
    } catch (err) {
        const error = new Error("Could not create a order");
        error.status = 400;
        console.log("postOrder", error);
        next(error);
    }
};

export { getAllOrders, postOrder };
