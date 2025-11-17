import { product, option, allergen } from "../model/index.js";

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

const addProduct = async (req, res, next) => {
    const {
        name,
        price,
        category,
        option_ids,
        description,
        image_url,
        allergen_ids,
        default_product,
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
        res.json({ success: true, new: newProduct });
    } catch (err) {
        const error = new Error("Could not create a product");
        error.status = 400;
        console.log("addProduct", error);
        next(error);
    }
};

export { getAllProducts, addProduct };
