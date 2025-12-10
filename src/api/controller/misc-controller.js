import { allergen, option } from "../model/index.js";

const getAllergens = async (req, res, next) => {
    try {
        const allergens = await allergen.findAll();
        res.json(allergens);
    } catch (err) {
        next(err);
    }
};

const getOptions = async (req, res, next) => {
    try {
        const options = await option.findAll();
        res.json(options);
    } catch (err) {
        next(err);
    }
};

export {getAllergens,getOptions}