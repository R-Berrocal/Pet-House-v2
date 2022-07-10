"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const Animal_type = db_connection_1.default.define("animal_type", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    animal: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    }
}, {
    tableName: "animal_type"
});
exports.default = Animal_type;
//# sourceMappingURL=animal_type.js.map