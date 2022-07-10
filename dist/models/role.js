"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const Role = db_connection_1.default.define("role", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        unique: true
    }
}, {
    tableName: "role"
});
exports.default = Role;
//# sourceMappingURL=role.js.map