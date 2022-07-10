"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const publication_1 = __importDefault(require("./publication"));
const Imgs_publication = db_connection_1.default.define("imgs_publication", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    publication_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: publication_1.default,
            key: 'id'
        }
    },
    url: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: "imgs_publication"
});
exports.default = Imgs_publication;
//# sourceMappingURL=imgs_publication.js.map