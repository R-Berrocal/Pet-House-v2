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
exports.renovateJWT = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const generate_jwt_1 = require("../helpers/generate-jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //verificar si el email existe
        const user = yield models_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                msg: `User / password wrong -  email`
            });
        }
        if (!user.condition) {
            return res.status(400).json({
                msg: `User / password  wrong - condition: false`
            });
        }
        const validPasword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPasword) {
            return res.status(400).json({
                msg: `User / password  wrong - password`
            });
        }
        const token = yield (0, generate_jwt_1.generateJWT)(user.id);
        return res.json({
            user,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `talk to the administrator`
        });
    }
});
exports.login = login;
const renovateJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const token = yield (0, generate_jwt_1.generateJWT)(user.id);
    res.json({
        user,
        token
    });
});
exports.renovateJWT = renovateJWT;
//# sourceMappingURL=auth.js.map