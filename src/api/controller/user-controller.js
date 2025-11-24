import bcrypt from "bcrypt";
import { user } from "../model/index.js";

const findAllUsers = async (req, res, next) => {
    if (req.user.role != "admin") {
        const error = new Error("Forbidden");
        error.status = 403;
        next(error);
        return;
    }
    try {
        const users = await user.findAll({
            attributes: { exclude: ["password"] },
        });
        if (users) {
            res.json(users);
        }
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    if (req.user.role !== "admin" && req.user.user_id !== Number(req.params.id)) {
        const error = new Error("Forbidden");
        error.status = 403;
        next(error);
        return;
    }
    const userData = await user.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
    });
    if (!userData) {
        const error = new Error("User not found");
        error.status = 404;
        next(error);
    }
    res.json(userData);
};

const addUser = async (req, res, next) => {
    console.log(req.body);
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const createdUser = await user.create(req.body);
        res.json({ message: "User created", id: createdUser.id });
    } catch (err) {
        next(err);
    }
};

export { findAllUsers, getUserById, addUser };
