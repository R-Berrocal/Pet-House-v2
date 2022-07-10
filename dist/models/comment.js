"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const publication_1 = __importDefault(require("./publication"));
const user_1 = __importDefault(require("./user"));
const Comment = db_connection_1.default.define("comment", {
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
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id'
        }
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    condition: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: "comment"
});
exports.default = Comment;
//# sourceMappingURL=comment.js.map