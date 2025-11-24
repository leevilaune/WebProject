import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const orderedFood = sequelize.define("ordered_food",{
    order_number:{
        'type': DataTypes.INTEGER,
        primaryKey: true,
    },
    product_id:{
        'type': DataTypes.INTEGER,
        primaryKey: true,
    },
},{tableName: "ordered_food"});

export default orderedFood;