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
Object.defineProperty(exports, "__esModule", { value: true });
exports.haveRole = exports.isAdminRole = void 0;
const models_1 = require("../models");
const isAdminRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(500).json({
            msg: "You want to verify the role without validating the token first"
        });
    }
    const { role_id, name1 } = req.user;
    const role = yield models_1.Role.findByPk(role_id);
    if (role.role !== "ADMIN") {
        return res.status(401).json({
            msg: `${name1} you are not ADMIN - you cannot do this `
        });
    }
    next();
});
exports.isAdminRole = isAdminRole;
const haveRole = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user) {
            return res.status(500).json({
                msg: "Se quiere verificar el role sin validar el token primero"
            });
        }
        const { role_id } = req.user;
        const role = yield models_1.Role.findByPk(role_id);
        if (!roles.includes(role.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    });
};
exports.haveRole = haveRole;
//# sourceMappingURL=validate_role.js.map