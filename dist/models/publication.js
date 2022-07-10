"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const animal_type_1 = __importDefault(require("./animal_type"));
const localization_1 = __importDefault(require("./localization"));
const user_1 = __importDefault(require("./user"));
const Publication = db_connection_1.default.define("publication", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    localization_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: localization_1.default,
            key: 'id'
        },
    },
    animal_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: animal_type_1.default,
            key: 'id'
        },
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id'
        },
    },
    title: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    condition: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isAdopt: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: null
    }
}, {
    tableName: "publication"
});
exports.default = Publication;
//# sourceMappingURL=publication.js.map