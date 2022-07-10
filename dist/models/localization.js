"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const Localization = db_connection_1.default.define("localization", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    lng: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    lat: {
        type: sequelize_1.DataTypes.STRING(100)
    }
}, {
    tableName: "localization"
});
exports.default = Localization;
//# sourceMappingURL=localization.js.map