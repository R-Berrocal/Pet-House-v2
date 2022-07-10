"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const adoption_1 = __importDefault(require("./adoption"));
const Imgs_adoption = db_connection_1.default.define("imgs_adoption", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    adoption_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: adoption_1.default,
            key: 'id'
        }
    },
    url: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: "imgs_adoption"
});
exports.default = Imgs_adoption;
//# sourceMappingURL=imgs_adoption.js.map