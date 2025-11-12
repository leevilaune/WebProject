import { DataTypes, Deferrable } from "sequelize";
import sequelize from "../config/database.js";

const productOption = sequelize.define("product_option",{
    product_id:{
        'type': DataTypes.INTEGER,
        primaryKey: true,
    },
    option_id:{
        'type': DataTypes.INTEGER,
        primaryKey: true,
    }
},{tableName:"product_option"});

export default productOption;