import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const orderedFood = sequelize.define("ordered_food",{
    
},{tableName: "ordered_food"});