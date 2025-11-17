import jwt from "jsonwebtoken";

import "dotenv/config";

const authenticateToken = async (req, res, next) => {
    console.log("authenticateToken", req.headers);

    const authHeader = await req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    console.log("token", token);

    if (token == null) {
        const error = new Error("Not authenticated, please login");
        error.status = 401;
        next(error);
        return;
    }

    try {
        res.locals.user = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (err) {
        const error = new Error("Invalid token");
        error.status = 403;
        next(error);
        return;
    }
};

export { authenticateToken };
