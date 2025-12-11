import bcrypt from "bcrypt";
import { user } from "../model/index.js";
import { validationResult } from "express-validator";

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
    if (
        req.user.role !== "admin" &&
        req.user.user_id !== Number(req.params.id)
    ) {
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    try {
        if (req.body.role) {
            const error = new Error(
                "UNAUTHORIZED: including 'role' not permitted"
            );
            error.status = 401;
            next(error);
            return;
        }
        req.body.role = "user";
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const createdUser = await user.create(req.body);
        res.json({ message: "User created", id: createdUser.user_id });
    } catch (err) {
        next(err);
    }
};

const putUser = async (req, res, next) => {
    const userId = Number(req.params.id);

    if (req.user.role !== "admin" && req.user.user_id !== userId) {
        const error = new Error("Forbidden");
        error.status = 403;
        next(error);
        return;
    }

    try {
        if (req.body.role && req.user.role !== "admin") {
            const error = new Error("UNAUTHORIZED: cannot update 'role'");
            error.status = 401;
            next(error);
            return;
        }

        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updated_user = await user.update(req.body, {
            where: { id: userId },
        });

        res.json({ updated: updated_user });
    } catch (err) {
        next(err);
    }
};

export { findAllUsers, getUserById, addUser, putUser };
