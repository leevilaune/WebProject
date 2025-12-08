import { json } from "sequelize";
import {
    order,
    product,
    option,
    allergen,
    orderedFood,
} from "../model/index.js";

const getAllOrders = async (req, res, next) => {
    if (req.user.role != "admin") {
        const error = new Error("Forbidden");
        error.status = 403;
        next(error);
        return;
    }
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

const getOrdersByUserId = async (req, res, next) => {
    if (
        req.user.role !== "admin" &&
        req.user.user_id !== Number(req.params.id)
    ) {
        const error = new Error("Forbidden");
        error.status = 403;
        next(error);
        return;
    }
    try {
        const orders = await order.findAll({
            where: { user_id: Number(req.params.id) },
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
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

const putStatus = async (req, res, next) => {
    const validStatus = ["received", "preparing", "completed"];
    if (!validStatus.includes(req.body.status)) {
        const error = new Error("Invalid status");
        error.status = 400;
        next(error);
        return;
    }
    const oldOrder = await order.findByPk(req.params.id);
    if (!oldOrder) {
        const error = new Error(`No order with id ${req.params.id}`);
        error.status = 404;
        next(error);
        return;
    }
    if (req.user.role !== "admin") {
        const error = new Error("Forbidden");
        error.status = 403;
        next(error);
        return;
    }
    try {
        if (req.body.status) {
            await oldOrder.update({
                status: req.body.status,
            });
            res.json({ updated: oldOrder });
        }
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
            status: "received",
        });
        if (product_ids && product_ids.length > 0) {
            await newOrder.setProducts(product_ids);
        }
        res.json({ new: newOrder });
    } catch (err) {
        const error = new Error("Could not create a order");
        error.status = 400;
        console.log("postOrder", error);
        next(error);
    }
};

const putOrder = async (req, res, next) => {
    const oldOrder = await order.findByPk(req.params.id);
    if (!oldOrder) {
        const error = new Error(`No order with id ${req.params.id}`);
        error.status = 404;
        next(error);
        return;
    }
    if (
        Number(req.user.user_id) !== oldOrder.dataValues.user_id &&
        req.user.role !== "admin"
    ) {
        const error = new Error("Forbidden");
        error.status = 403;
        next(error);
        return;
    }
    try {
        if (req.body.delivery_address) {
            await oldOrder.update({
                delivery_address: req.body.delivery_address,
            });
            res.json({ updated: oldOrder });
        }
    } catch (err) {
        next(err);
    }
};

const deleteOrder = async (req, res, next) => {
    const oldOrder = await order.findByPk(req.params.id);
    if (!oldOrder) {
        const error = new Error(`No order with id ${req.params.id}`);
        error.status = 404;
        next(error);
        return;
    }
    if (
        Number(req.user.user_id) !== oldOrder.dataValues.user_id &&
        req.user.role !== "admin"
    ) {
        const error = new Error("Forbidden");
        error.status = 403;
        next(error);
        return;
    }
    try {
        await orderedFood.destroy({ where: { order_number: req.params.id } });
        await order.destroy({ where: { order_number: req.params.id } });
        res.json({ deleted: { order_number: req.params.id } });
    } catch (err) {
        next(err);
    }
};

export {
    getAllOrders,
    postOrder,
    putOrder,
    deleteOrder,
    getOrdersByUserId,
    putStatus,
};
