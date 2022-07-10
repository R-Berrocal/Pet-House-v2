"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const role_1 = __importDefault(require("./role"));
const User = db_connection_1.default.define("user", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    role_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: role_1.default,
            key: 'id'
        },
        defaultValue: '9e5e2e6c-fcea-11ec-b29b-803049704764'
    },
    name1: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    name2: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    last_name1: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    last_name2: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    condition: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    img: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: "user"
});
exports.default = User;
//# sourceMappingURL=user.js.map