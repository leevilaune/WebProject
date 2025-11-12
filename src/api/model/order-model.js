import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import user from "./user-model.js";

const order = sequelize.define("order", {
    order_number: {
        'type': DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    delivery_address:{
        'type': DataTypes.STRING,
        allowNull: false,
    },
    price: {
        'type': DataTypes.FLOAT,
        allowNull: false,
    },
    timestamp: {
        'type': DataTypes.BIGINT,
        allowNull: false,
    },
    user_id: {
        'type': DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'user_id',
        }
    }
},{tableName: "order"});

export default order;