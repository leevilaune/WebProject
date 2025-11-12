import { DataTypes, Deferrable } from "sequelize";
import sequelize from "../config/database.js";

const productAllergen = sequelize.define("product_allergen",{
    product_id:{
        'type': DataTypes.INTEGER,
        primaryKey: true,
    },
    allergen_id:{
        'type': DataTypes.INTEGER,
        primaryKey: true,
    }
},{tableName:"product_allergen"});

export default productAllergen;