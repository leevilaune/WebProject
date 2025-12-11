import {
    product,
    option,
    allergen,
    productOption,
    productAllergen,
} from "../model/index.js";

const getAllProducts = async (req, res, next) => {
    const products = await product.findAll({
        where: { default_product: true },
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
    });
    if (products.length > 0) {
        res.json(products);
    } else {
        const error = new Error("Products is empty");
        error.status = 404;
        console.log("getAllProducts", error);
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const fetchedProduct = await product.findByPk(Number(req.params.id));
        res.json(fetchedProduct);
    } catch (err){
        next(err);
    }
};

const addProduct = async (req, res, next) => {
    let default_product = false;
    if (req.user.role == "admin") {
        default_product = true;
    }
    const option_ids = JSON.parse(req.body.option_ids);
    const allergen_ids = JSON.parse(req.body.allergen_ids);
    const { name, price, category, description } = req.body;
    const image_url = req.file ? req.file.filename : null;

    try {
        const newProduct = await product.create({
            name: name,
            price: price,
            category: category,
            description: description,
            image_url: image_url,
            default_product: default_product,
        });
        if (option_ids && option_ids.length > 0) {
            await newProduct.setOptions(option_ids);
        }
        if (allergen_ids && allergen_ids.length > 0) {
            await newProduct.setAllergens(allergen_ids);
        }
        res.json({ success: true, new: newProduct });
    } catch (err) {
        const error = new Error("Could not create a product");
        error.status = 400;
        console.log("addProduct", error);
        next(error);
    }
};

const putProduct = async (req, res, next) => {
    const oldProduct = await product.findByPk(req.params.id);
    if (!oldProduct) {
        const error = new Error(`No product with id ${req.params.id}`);
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
        await oldProduct.update(req.body);
        res.json({ updated: oldProduct });
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    const oldProduct = await product.findByPk(req.params.id);
    if (!oldProduct) {
        const error = new Error(`No product with id ${req.params.id}`);
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
        await productOption.destroy({ where: { product_id: req.params.id } });
        await productAllergen.destroy({ where: { product_id: req.params.id } });
        await product.destroy({ where: { product_id: req.params.id } });
        res.json({ deleted: { product_id: req.params.id } });
    } catch (err) {
        next(err);
    }
};

const postProductWithoutImage = async (req, res, next) => {
    let default_product = false;
    if (req.user.role == "admin") {
        default_product = true;
    }
    const {
        name,
        price,
        category,
        description,
        image_url,
        option_ids,
        allergen_ids,
    } = req.body;
    try {
        const newProduct = await product.create({
            name: name,
            price: price,
            category: category,
            description: description,
            image_url: image_url,
            default_product: default_product,
        });
        if (option_ids && option_ids.length > 0) {
            await newProduct.setOptions(option_ids);
        }
        if (allergen_ids && allergen_ids.length > 0) {
            await newProduct.setAllergens(allergen_ids);
        }
        res.json({ new: newProduct });
    } catch (err) {
        const error = new Error("Could not create a product");
        error.status = 400;
        console.log("addProduct", error);
        next(error);
    }
};

export {
    getAllProducts,
    getProductById,
    addProduct,
    putProduct,
    deleteProduct,
    postProductWithoutImage,

};
