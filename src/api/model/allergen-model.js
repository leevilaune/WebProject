import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const allergen = sequelize.define("allergen",{
    allergen_id: {
        'type': DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    allergen_name: {
        'type': DataTypes.STRING,
        allowNull: false,
    },
    allergen_icon_url: {
        'type': DataTypes.STRING,
        allowNull: true,
    }
},{tableName:"allergen"});

export default allergen;