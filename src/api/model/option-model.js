import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const option = sequelize.define("option",{
    option_id: {
        'type': DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        'type': DataTypes.STRING,
        allowNull: false,
    },
    description: {
        'type': DataTypes.STRING,
        allowNull: false,
    }
},{tableName: "option"});

export default option;