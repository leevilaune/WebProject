import express from "express";
import sequelize from "./api/config/database.js";
import { error } from "console";
import productRouter from "./api/router/product-router.js";
import authRouter from "./api/router/auth-router.js";
import userRouter from "./api/router/user-router.js";
import {
    notFoundHandler,
    errorHandler,
} from "./api/middleware/error-handler.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/docs", express.static("docs"));

app.use("/api/v1/product", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);

try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("DB connection established");
} catch (error) {
    console.error("DB connection failed", error);
}

app.listen(3000);
