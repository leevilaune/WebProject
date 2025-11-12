import express from "express";
import sequelize from "./api/config/database.js";
import { error } from "console";
import productRouter from "./api/router/product-router.js";

const app = express();
app.use(express.json());

app.use("/api/v1/product",productRouter);

try{
  await sequelize.authenticate();
  await sequelize.sync({alter:true});
  console.log("DB connection established");
}catch (error){
  console.error("DB connection failed", error);
}

app.listen(3000);