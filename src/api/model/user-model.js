import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const user = sequelize.define("user", {
    user_id: {
        'type': DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    role: {
        'type': DataTypes.STRING,
        allowNull: false,
    },
    username: {
        'type': DataTypes.STRING,
        unique: true,
        allowNull: false,

    },
    password: {
        'type': DataTypes.STRING,
        allowNull: false,

    },
    email: {
        'type': DataTypes.STRING,
        allowNull: false,

    },
    phone_number:{
        'type': DataTypes.STRING,
    },
    address: {
        'type': DataTypes.STRING,
    }
},  {tableName: "user"});

export default user;