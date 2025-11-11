import express from "express";
import User from '../src/api/model/user-model.js';
import sequelize from "./api/config/database.js";
import { error } from "console";
const app = express();
app.use(express.json());

try{
  await sequelize.authenticate();
  await sequelize.sync({alter:true});
  console.log("DB connection established");
}catch (error){
  console.error("DB connection failed", error);
}
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.listen(3000);