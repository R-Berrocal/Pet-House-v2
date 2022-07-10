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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const uuid_1 = require("uuid");
const generate_jwt_1 = require("../helpers/generate-jwt");
const id_model_1 = require("../helpers/id-model");
const cloudinary_1 = require("cloudinary");
const cloudinary = cloudinary_1.v2;
cloudinary.config(process.env.CLOUDINARY_URL || "");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body } = req;
    try {
        const role = yield (0, id_model_1.idRole)(body.role);
        const array = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img;
        const user = models_1.User.build(Object.assign({ id: (0, uuid_1.v4)(), role_id: role }, body));
        //encriptar contraseña 
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(body.password, salt);
        //subida de archivos
        if (array) {
            const { tempFilePath } = array;
            const { secure_url } = yield cloudinary.uploader.upload(tempFilePath, {
                folder: 'Users'
            });
            user.img = secure_url;
        }
        //guardar en DB
        yield user.save();
        const token = yield (0, generate_jwt_1.generateJWT)(user.id);
        return res.status(201).json({
            user,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "hable con el administrador"
        });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset = 0, limit = 10 } = req.query;
    try {
        const users = yield models_1.User.findAll({
            where: {
                condition: true
            },
            include: {
                attributes: ['role'],
                model: models_1.Role
            },
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        res.json({
            count: users.length,
            users
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield models_1.User.findOne({
            where: { id: userId },
            include: {
                attributes: ['role'],
                model: models_1.Role
            }
        });
        if (!user) {
            return res.status(400).json({
                msg: `id user not exist in db`
            });
        }
        res.json({
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const { userId } = req.params;
    const _d = req.body, { id, password, email, role } = _d, resto = __rest(_d, ["id", "password", "email", "role"]);
    try {
        const array = (_b = req.files) === null || _b === void 0 ? void 0 : _b.img;
        if (password) {
            const salt = bcryptjs_1.default.genSaltSync();
            resto.password = bcryptjs_1.default.hashSync(password, salt);
        }
        if (role) {
            const roleId = yield (0, id_model_1.idRole)(role);
            resto.role_id = roleId;
        }
        const user = yield models_1.User.findByPk(userId);
        if (array) {
            console.log(user === null || user === void 0 ? void 0 : user.img);
            if (user === null || user === void 0 ? void 0 : user.img) {
                const nombreArr = (_c = user.img) === null || _c === void 0 ? void 0 : _c.split("/");
                const nombre = nombreArr[nombreArr.length - 1];
                const [public_id] = nombre.split(".");
                cloudinary.uploader.destroy("Users/" + public_id);
            }
            const { tempFilePath } = array;
            const { secure_url } = yield cloudinary.uploader.upload(tempFilePath, {
                folder: "Users"
            });
            resto.img = secure_url;
        }
        yield user.update(resto);
        res.json({
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.updateUser = updateUser;
const deletUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield models_1.User.findByPk(userId);
        user.update({ condition: false });
        res.json({
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`
        });
    }
});
exports.deletUser = deletUser;
//# sourceMappingURL=user.js.map