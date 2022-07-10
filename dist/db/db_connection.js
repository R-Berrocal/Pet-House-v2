"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const db = new sequelize_1.Sequelize(process.env.DATABASE_NAME || "", process.env.DATABASE_USER || "", process.env.DATABASE_PASS, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: +process.env.DATABASE_PORT,
});
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.authenticate();
        // db.sync();
        console.log('Connection has been established succesfully');
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.dbConnection = dbConnection;
exports.default = db;
//# sourceMappingURL=db_connection.js.map