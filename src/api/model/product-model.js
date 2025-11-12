import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const product = sequelize.define("product",{
    product_id: {
        'type': DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        'type': DataTypes.STRING,
        allowNull: false,
    },
    price: {
        'type': DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        'type': DataTypes.TEXT,
        allowNull: true,
    },
    image_url: {
        'type': DataTypes.STRING,
        allowNull: true,
    },
    category: {
        'type': DataTypes.STRING,
        allowNull: false,
    },
    allergen: {
        'type': DataTypes.STRING,
        allowNull: false,
    },
    default_product: {
        'type': DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {tableName: "product"});

export default product;