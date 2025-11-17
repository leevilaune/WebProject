import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { user } from "../model/index.js";
import "dotenv/config";

const postLogin = async (req, res, next) => {
    console.log("postLogin", req.body);
    const userData = await user.findOne({
        where: { username: req.body.username },
    });
    console.log(userData);
    if (!userData) {
        const error = new Error("User not found");
        error.status = 404;
        next(error);
        return;
    }

    const isMatch = await bcrypt.compare(req.body.password, userData.password);
    if (!isMatch) {
        const error = new Error("Incorrect password");
        error.status = 401;
        next(error);
        return;
    }

    const userWithNoPassword = {
        user_id: userData.user_id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        role: userData.role,
    };
    const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    res.json({ user: userWithNoPassword, token });
};

const getMe = async (req, res, next) => {
    console.log("getMe", res.locals.user);
    if (res.locals.user) {
        res.json({ message: "token ok", user: res.locals.user });
    } else {
        const error = new Error("Not authenticated, please login");
        error.status = 401;
        next(error);
        return;
    }
};

export { postLogin, getMe };
